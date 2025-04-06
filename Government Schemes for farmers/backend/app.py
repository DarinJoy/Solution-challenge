from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='../frontend')
CORS(app)

# Sample data for government schemes
schemes = [
    {
        "id": 1,
        "name": "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
        "description": "PM-KISAN is a central sector scheme launched on 24th February 2019 to supplement financial needs of land holding farmers. Financial benefit of Rs. 6000/- per year is transferred in three equal four-monthly installments into the bank accounts of farmers' families through Direct Benefit Transfer (DBT) mode.",
        "eligibility": "Land holding farmers",
        "benefits": "₹6,000 per year in three equal installments",
        "category": "Income Support",
        "link": "https://pmkisan.gov.in/"
    },
    {
        "id": 2,
        "name": "Pradhan Mantri Kisan MaanDhan Yojana (PM-KMY)",
        "description": "PM-KMY is a contributory scheme for small and marginal farmers to provide security during old age. Farmers between 18-40 years contribute ₹55-200 monthly until age 60.",
        "eligibility": "Small and marginal farmers aged 18-40 years",
        "benefits": "₹3,000 monthly pension after 60 years",
        "category": "Pension",
        "link": "https://maandhan.in/"
    },
    {
        "id": 3,
        "name": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        "description": "PMFBY provides comprehensive crop insurance against all non-preventable natural risks from pre-sowing to post-harvest.",
        "eligibility": "All farmers",
        "benefits": "Insurance coverage for crop loss due to natural calamities",
        "category": "Insurance",
        "link": "https://pmfby.gov.in/"
    },
    {
        "id": 4,
        "name": "Modified Interest Subvention Scheme (MISS)",
        "description": "Provides concessional short-term agri-loans to farmers practicing crop husbandry and allied activities.",
        "eligibility": "Farmers availing short-term crop loans",
        "benefits": "7% interest rate, reduced to 4% for prompt repayment",
        "category": "Credit",
        "link": "https://www.rbi.org.in/Scripts/BS_ViewMasCirculardetails.aspx?id=12345"
    },
    {
        "id": 5,
        "name": "Agriculture Infrastructure Fund (AIF)",
        "description": "Medium-long term debt financing facility for investment in viable projects for post-harvest management infrastructure and community farming assets.",
        "eligibility": "Farmers, Agri-entrepreneurs, Start-ups, FPOs, SHGs, etc.",
        "benefits": "Interest subvention of 3% per annum and credit guarantee coverage",
        "category": "Infrastructure",
        "link": "https://agriinfra.dac.gov.in/"
    },
    {
        "id": 6,
        "name": "Formation & Promotion of new 10,000 FPOs",
        "description": "Scheme for formation and promotion of 10,000 Farmer Producer Organizations (FPOs) with financial assistance up to ₹18 lakh per FPO.",
        "eligibility": "Farmers groups",
        "benefits": "Financial assistance and credit guarantee facility",
        "category": "Organization",
        "link": "https://pib.gov.in/Pressreleaseshare.aspx?PRID=1696547"
    },
    {
        "id": 7,
        "name": "National Beekeeping and Honey Mission (NBHM)",
        "description": "Scheme for overall promotion and development of scientific beekeeping to achieve the goal of 'Sweet Revolution'.",
        "eligibility": "Beekeepers, Honey Societies, Firms, Companies",
        "benefits": "Support for honey testing labs and beekeeping infrastructure",
        "category": "Technology",
        "link": "https://nbb.gov.in/default.html"
    },
    {
        "id": 8,
        "name": "Market Intervention Scheme and Price Support Scheme (MIS-PSS)",
        "description": "Scheme for procurement of agricultural and horticultural commodities to protect growers from distress sale.",
        "eligibility": "Farmers growing notified crops",
        "benefits": "Price support for agricultural produce",
        "category": "Market Support",
        "link": "https://pib.gov.in/PressReleaseIframePage.aspx?PRID=1809685#:~:text=Press%20Release:%20Press%20Information%20Bureau,received%20from%20the%20State%20Governments."
    },
    {
        "id": 9,
        "name": "Namo Drone Didi",
        "description": "Scheme for providing drones to Women Self Help Groups (SHGs) for agricultural purposes.",
        "eligibility": "Women Self Help Groups",
        "benefits": "80% subsidy on drone cost up to ₹8 lakhs",
        "category": "Technology",
        "link": "https://www.india.gov.in/spotlight/namo-drone-didi/"
    },
    {
        "id": 10,
        "name": "Rashtriya Krishi Vikas Yojana (RKVY)",
        "description": "Scheme focusing on creation of pre & post-harvest infrastructure in agriculture and allied sectors.",
        "eligibility": "State Governments",
        "benefits": "Financial support for agricultural infrastructure",
        "category": "Infrastructure",
        "link": "https://rkvy.da.gov.in/"
    },
    {
        "id": 11,
        "name": "Soil Health Card (SHC)",
        "description": "Scheme providing information to farmers on nutrient status of their soil along with recommendations.",
        "eligibility": "All farmers",
        "benefits": "Free soil testing and recommendations",
        "category": "Technology",
        "link": "https://soilhealth.dac.gov.in/"
    },
    {
        "id": 12,
        "name": "Rainfed Area Development (RAD)",
        "description": "Scheme promoting Integrated Farming System (IFS) in cluster mode for maximizing farm returns.",
        "eligibility": "Farmers in rainfed areas",
        "benefits": "Support for integrated farming systems",
        "category": "Development",
        "link": "https://nmsa.dac.gov.in/frmComponents.aspx"
    },
    {
        "id": 13,
        "name": "Per Drop More Crop (PDMC)",
        "description": "Scheme for increasing water use efficiency through Micro Irrigation technologies.",
        "eligibility": "All farmers",
        "benefits": "Subsidy for micro-irrigation systems",
        "category": "Technology",
        "link": "https://pdmc.da.gov.in/"
    },
    {
        "id": 14,
        "name": "Micro Irrigation Fund (MIF)",
        "description": "Fund to facilitate States in mobilizing resources for expanding coverage of Micro Irrigation.",
        "eligibility": "State Governments",
        "benefits": "Interest subvention on loans",
        "category": "Infrastructure",
        "link": "https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2003188"
    },
    {
        "id": 15,
        "name": "Paramparagat Krishi Vikas Yojana (PKVY)",
        "description": "Scheme to increase soil fertility and production of healthy food through organic practices.",
        "eligibility": "Farmers groups",
        "benefits": "₹31,500 per hectare assistance",
        "category": "Organic Farming",
        "link": "https://pib.gov.in/PressReleasePage.aspx?PRID=2099756"
    }
]

@app.route('/')
def serve_frontend():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

@app.route('/api/schemes', methods=['GET'])
def get_schemes():
    return jsonify(schemes)

@app.route('/api/schemes/<int:scheme_id>', methods=['GET'])
def get_scheme(scheme_id):
    scheme = next((scheme for scheme in schemes if scheme['id'] == scheme_id), None)
    if scheme is None:
        return jsonify({"error": "Scheme not found"}), 404
    return jsonify(scheme)

if __name__ == '__main__':
    app.run(debug=True,port=5003) 