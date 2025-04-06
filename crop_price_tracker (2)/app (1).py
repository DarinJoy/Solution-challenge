from flask import Flask, render_template, request, jsonify, session
import requests
import os
import logging
import json
from datetime import datetime, timedelta
from crop_model import predict_crop
from districts_data import districts_by_state
from markets_data import markets_by_district
from varieties_data import varieties_by_commodity
from flask_mail import Mail, Message
import random
import string

# Set up logging for better debugging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
app.secret_key = os.urandom(24)  # Generate a random secret key for session management

# Flask-Mail configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME', 'sandhumanmeetsingh1@gmail.com')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD', 'ocqp vbll samm llbg')  # Use environment variable in production
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_USERNAME', 'sandhumanmeetsingh1@gmail.com')

# Initialize Flask-Mail with better error handling
try:
    mail = Mail(app)
except Exception as e:
    logging.error(f"Failed to initialize Flask-Mail: {str(e)}")
    mail = None

# Store OTPs temporarily (in production, use a proper database)
otps = {}

# Create the directory for models if it doesn't exist
os.makedirs('static/models', exist_ok=True)

# Get API key from environment variables with fallback
API_KEY = os.environ.get("DATA_GOV_API_KEY", "579b464db66ec23bdd000001db94b6770c7b43d0636814ffc0f545bf")

def generate_otp():
    """Generate a 6-digit OTP"""
    return ''.join(random.choices(string.digits, k=6))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_prices', methods=['POST'])
def get_prices():
    data = request.form
    
    # Log the request parameters for debugging
    logging.debug(f"Requesting prices with parameters: {data}")
    
    # Clean input data - strip whitespace
    state = data.get('state', '').strip()
    district = data.get('district', '').strip()
    market = data.get('market', '').strip()
    commodity = data.get('commodity', '').strip()
    variety = data.get('variety', '').strip()
    grade = data.get('grade', '').strip()
    arrival_date = data.get('arrival_date', '')
    
    # Build API request parameters with case-insensitive search
    params = {
        "api-key": API_KEY,
        "format": "json",
        "filters[State]": state,
        "filters[District]": district,
        "filters[Market]": market,
        "filters[Commodity]": commodity,
        "filters[Variety]": variety,
        "filters[Grade]": grade,
        "limit": 1000
    }
    
    # Add arrival date if provided
    if arrival_date:
        params["filters[Arrival_Date]"] = arrival_date
    
    try:
        # Get current date data
        response = requests.get(
            "https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24", 
            params=params
        )
        
        if response.status_code == 200:
            result = response.json()
            records = result.get('records', [])
            logging.debug(f"API returned {len(records)} records")
            
            # If we have records, also get data for past 7 days for charting
            if records and arrival_date:
                # Get historical data (last 7 days)
                historical_records = get_historical_data(state, district, market, commodity, variety, grade, arrival_date)
                
                # Get nearby market data
                nearby_markets = get_nearby_markets(state, district, commodity, arrival_date)
                
                # Combine all data
                result['historical_records'] = historical_records
                result['nearby_markets'] = nearby_markets
                
            return jsonify(result)
        else:
            logging.error(f"API error: {response.status_code}, {response.text}")
            return jsonify({
                "error": f"Data API error: {response.status_code}",
                "message": "Unable to fetch price data from source"
            }), 500
            
    except Exception as e:
        logging.error(f"Exception while fetching prices: {str(e)}")
        return jsonify({
            "error": "Server error",
            "message": str(e)
        }), 500

def get_historical_data(state, district, market, commodity, variety, grade, end_date):
    """Fetch price data for the last 7 days for the given parameters"""
    try:
        # Parse the end date
        end_date_obj = datetime.strptime(end_date, "%Y-%m-%d")
        
        # Generate 7 dates going backward from the end date
        historical_records = []
        
        for i in range(1, 8):
            date = end_date_obj - timedelta(days=i)
            date_str = date.strftime("%Y-%m-%d")
            
            params = {
                "api-key": API_KEY,
                "format": "json",
                "filters[State]": state,
                "filters[District]": district,
                "filters[Market]": market,
                "filters[Commodity]": commodity,
                "filters[Variety]": variety,
                "filters[Grade]": grade,
                "filters[Arrival_Date]": date_str,
                "limit": 1
            }
            
            response = requests.get(
                "https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24", 
                params=params
            )
            
            if response.status_code == 200:
                result = response.json()
                daily_records = result.get('records', [])
                
                if daily_records:
                    historical_records.extend(daily_records)
        
        return historical_records
    except Exception as e:
        logging.error(f"Error fetching historical data: {str(e)}")
        return []

def get_nearby_markets(state, district, commodity, date):
    """Fetch price data from nearby markets for the same commodity and date"""
    try:
        params = {
            "api-key": API_KEY,
            "format": "json",
            "filters[State]": state,
            "filters[Commodity]": commodity,
            "filters[Arrival_Date]": date,
            "limit": 10
        }
        
        response = requests.get(
            "https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24", 
            params=params
        )
        
        if response.status_code == 200:
            result = response.json()
            markets = result.get('records', [])
            
            # Filter out the original district to only show truly "nearby" markets
            nearby_markets = [market for market in markets if market.get('District', '').strip() != district]
            
            return nearby_markets[:5]  # Return at most 5 nearby markets
        return []
    except Exception as e:
        logging.error(f"Error fetching nearby market data: {str(e)}")
        return []

@app.route('/districts', methods=['GET'])
def get_districts():
    state = request.args.get('state', '')
    
    if not state:
        return jsonify({"districts": []})
    

    
    # For states not in our demo data, return empty list
    return jsonify({"districts": districts_by_state.get(state, [])})

@app.route('/markets', methods=['GET'])
def get_markets():
    state = request.args.get('state', '')
    district = request.args.get('district', '')
    
    if not state or not district:
        return jsonify({"markets": []})
    
    # For districts not in our demo data, return empty list
    return jsonify({"markets": markets_by_district.get(district, [])})

@app.route('/varieties', methods=['GET'])
def get_varieties():
    commodity = request.args.get('commodity', '')
    
    if not commodity:
        return jsonify({"varieties": []})
    
    # For commodities not in our demo data, return empty list
    return jsonify({"varieties": varieties_by_commodity.get(commodity, [])})

@app.route('/grades', methods=['GET'])
def get_grades():
    commodity = request.args.get('commodity', '')
    
    if not commodity:
        return jsonify({"grades": []})
    
    # For commodities not in our demo data, return some default grades
    default_grades = ["FAQ", "Large", "Local", "Medium", "Small"]
    return jsonify({"grades": default_grades})

@app.route('/states', methods=['GET'])
def get_states():
    # All Indian states
    sample_states = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
        "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ]
    return jsonify({"states": sample_states})

@app.route('/commodities', methods=['GET'])
def get_commodities():
    # Return commodities for dropdown
    common_commodities = [
        "Ajwan", "Amaranthus", "Amla(Nelli Kai)", "Amphophalus", "Amranthas Red",
        "Antawala", "Apple", "Arecanut(Betelnut/Supari)", "Arhar (Tur/Red Gram)(Whole)",
        "Arhar Dal(Tur Dal)", "Ashgourd", "Astera", "Avare Dal", "Bajra(Pearl Millet/Cumbu)",
        "Banana", "Banana - Green", "Barley (Jau)", "Beans", "Beetroot",
        "Bengal Gram Dal (Chana Dal)", "Bengal Gram(Gram)(Whole)", "Ber(Zizyphus/Borehannu)",
        "Betal Leaves", "Bhindi(Ladies Finger)", "Bitter gourd", "Black Gram (Urd Beans)(Whole)",
        "Black Gram Dal (Urd Dal)", "Black pepper", "Bottle gourd", "Brinjal", "Bull",
        "Bunch Beans", "Cabbage", "Capsicum", "Cardamoms", "Carrot", "Cashewnuts",
        "Castor Seed", "Cauliflower", "Chapparad Avare", "Cherry", "Chikoos(Sapota)",
        "Chili Red", "Chilly Capsicum", "Chow Chow", "Cluster beans", "Cock", "Cocoa",
        "Coconut", "Coconut Oil", "Coconut Seed", "Coffee", "Colacasia", "Copra",
        "Coriander(Leaves)", "Corriander seed", "Cotton", "Cow", "Cowpea (Lobia/Karamani)",
        "Cowpea(Veg)", "Cucumbar(Kheera)", "Cummin Seed(Jeera)", "Custard Apple (Sharifa)",
        "Dhaincha", "Drumstick", "Dry Chillies", "Elephant Yam (Suran)", "Field Pea",
        "Fig(Anjura/Anjeer)", "Fish", "French Beans (Frasbean)", "Garlic", "Ghee",
        "Ginger(Dry)", "Ginger(Green)", "Grapes", "Green Avare (W)", "Green Chilli",
        "Green Gram (Moong)(Whole)", "Green Gram Dal (Moong Dal)", "Green Peas",
        "Ground Nut Seed", "Groundnut", "Guar", "Guar Seed(Cluster Beans Seed)",
        "Guava", "Gur(Jaggery)", "He Buffalo", "Indian Beans (Seam)", "Indian Colza(Sarson)",
        "Isabgul (Psyllium)", "Jack Fruit", "Jamun(Narale Hannu)", "Jasmine", "Jowar(Sorghum)",
        "Jute", "Kakada", "Kankambra", "Karbuja(Musk Melon)", "Kartali (Kantola)",
        "Kinnow", "Knool Khol", "Kodo Millet(Varagu)", "Lak(Teora)", "Leafy Vegetable",
        "Lemon", "Lentil (Masur)(Whole)", "Lime", "Linseed", "Litchi", "Little gourd (Kundru)",
        "Long Melon(Kakri)", "Mahua", "Maize", "Mango", "Mango (Raw-Ripe)", "Marigold(Calcutta)",
        "Marigold(loose)", "Mashrooms", "Masur Dal", "Methi Seeds", "Methi(Leaves)",
        "Millets", "Mint(Pudina)", "Moath Dal", "Mousambi(Sweet Lime)", "Mustard",
        "Mustard Oil", "Nutmeg", "Onion", "Onion Green", "Orange", "Other green and fresh vegetables",
        "Ox", "Paddy(Dhan)(Basmati)", "Paddy(Dhan)(Common)", "Papaya", "Peach", "Peas Wet",
        "Peas cod", "Peas(Dry)", "Pegeon Pea (Arhar Fali)", "Pepper ungarbled", "Pineapple",
        "Plum", "Pointed gourd (Parval)", "Pomegranate", "Potato", "Pumpkin", "Raddish",
        "Ragi (Finger Millet)", "Rajgir", "Red Gram", "Rice", "Ridgeguard(Tori)",
        "Round gourd", "Rubber", "Safflower", "Seemebadnekai", "Seetapal", "Sesamum(Sesame,Gingelly,Til)",
        "Snakeguard", "Soanf", "Soyabean", "Spinach", "Squash(Chappal Kadoo)", "Sugar",
        "Sunflower", "Suva (Dill Seed)", "Suvarna Gadde", "Sweet Potato", "Sweet Pumpkin",
        "Tamarind Fruit", "Tamarind Seed", "Tapioca", "Tender Coconut", "Thogrikai",
        "Thondekai", "Tinda", "Tomato", "Tube Flower", "Turmeric", "Turmeric (raw)",
        "Water Melon", "Wheat", "White Peas", "White Pumpkin", "Wood", "Yam", "Yam (Ratalu)"
    ]
    return jsonify({"commodities": common_commodities})

@app.route('/crop-recommendation')
def crop_recommendation():
    return render_template('crop_recommendation.html')

@app.route('/predict')
def predict():
    try:
        # Get input values from the request
        N = float(request.args.get('N', 0))
        P = float(request.args.get('P', 0))
        K = float(request.args.get('K', 0))
        temperature = float(request.args.get('temperature', 0))
        humidity = float(request.args.get('humidity', 0))
        ph = float(request.args.get('ph', 0))
        rainfall = float(request.args.get('rainfall', 0))
        
        # Log parameters for debugging
        logging.debug(f"Crop prediction with parameters: N={N}, P={P}, K={K}, temperature={temperature}, humidity={humidity}, ph={ph}, rainfall={rainfall}")
        
        # Make prediction
        crop = predict_crop(N, P, K, temperature, humidity, ph, rainfall)
        
        # Return the result
        return jsonify({
            "success": True,
            "crop": crop,
            "parameters": {
                "N": N,
                "P": P,
                "K": K,
                "temperature": temperature,
                "humidity": humidity,
                "ph": ph,
                "rainfall": rainfall
            }
        })
    
    except Exception as e:
        logging.error(f"Error during crop prediction: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/send_otp', methods=['POST'])
def send_otp():
    data = request.get_json()
    method = data.get('method')
    contact = data.get('contact')
    
    if not method or not contact:
        return jsonify({'success': False, 'message': 'Missing required parameters'})
    
    otp = generate_otp()
    expiry = datetime.now() + timedelta(minutes=5)  # OTP expires in 5 minutes
    
    if method == 'email':
        if not mail:
            return jsonify({'success': False, 'message': 'Email service not configured properly'})
            
        try:
            msg = Message(
                'Your OTP for Farmer Login',
                recipients=[contact],
                body=f'Your OTP for login is: {otp}\nThis OTP will expire in 5 minutes.'
            )
            mail.send(msg)
            otps[contact] = {'otp': otp, 'expiry': expiry}
            return jsonify({'success': True})
        except Exception as e:
            logging.error(f"Failed to send email: {str(e)}")
            return jsonify({
                'success': False, 
                'message': 'Failed to send email. Please check your email configuration or try again later.'
            })
    elif method == 'phone':
        # Implement phone OTP logic here (using SMS service)
        # For now, just store the OTP
        otps[contact] = {'otp': otp, 'expiry': expiry}
        return jsonify({'success': True})
    else:
        return jsonify({'success': False, 'message': 'Invalid method'})

@app.route('/verify_otp', methods=['POST'])
def verify_otp():
    data = request.get_json()
    method = data.get('method')
    contact = data.get('contact')
    otp = data.get('otp')
    
    if not method or not contact or not otp:
        return jsonify({'success': False, 'message': 'Missing required parameters'})
    
    stored_data = otps.get(contact)
    if not stored_data:
        return jsonify({'success': False, 'message': 'No OTP found for this contact'})
    
    if datetime.now() > stored_data['expiry']:
        del otps[contact]  # Clean up expired OTP
        return jsonify({'success': False, 'message': 'OTP has expired'})
    
    if otp == stored_data['otp']:
        del otps[contact]  # Clean up used OTP
        session['logged_in'] = True
        session['contact'] = contact
        return jsonify({'success': True})
    
    return jsonify({'success': False, 'message': 'Invalid OTP'})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)