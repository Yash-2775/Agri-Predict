// src/constants/index.ts
import { Language, GovernmentScheme, MarketplaceCategory } from "../types";

export const TEXTS = {
  [Language.EN]: {
    // App
    appName: "Agri-Predict",
    logout: "Logout",

    // Auth
    loginTitle: "Welcome Back 👨‍🌾",
    email: "Email Address",
    password: "Password",
    login: "Login",
    noAccount: "Don't have an account?",
    signUp: "Sign Up",
    registerTitle: "Create Account",
    name: "Full Name",
    phone: "Phone Number",
    state: "State",
    city: "City",
    register: "Register",
    haveAccount: "Already have an account?",

    //Dashboard
    Home: "Home",
    detectDisease: "Detect Disease",
    viewSchemes: "View Schemes",
    sellProduct: "Marketplace",
    chatWithAI: "Chat with AI",
    goodMorning: "Good Morning",
    farmingTips: "Tip of the Day",
    quickActions: "Quick Actions",

    // AI Chatbot
    aiAssistant: "AI Farming Assistant",
    chatPlaceholder: "Ask me about your crops...",

    // Government Schemes
    govtSchemes: "Government Schemes",
    searchSchemes: "Search schemes...",
    eligibility: "Eligibility",
    benefits: "Benefits",
    officialLink: "Official Link",
    documents: "Required Documents",
    howToApply: "How to Apply",

    // Marketplace
    marketplace: "Marketplace",
    buy: "Buy",
    sell: "Sell",
    searchProducts: "Search products...",
    allCategories: "All",
    crops: "Crops",
    fertilizers: "Fertilizers",
    machineries: "Machinery",
    chemicals: "Chemicals",
    price: "Price",
    quantity: "Quantity",
    unit: "Unit",
    addProduct: "Add Product",
    productName: "Product Name",
    selectCategory: "Select Category",
    description: "Description",
    perHour: "Per Hour",
    perKg: "Per Kg",
    perLitre: "Per Litre",
    expiryDate: "Expiry Date",
    contactSeller: "Contact Seller",
    sellYourProduct: "Sell Your Product",
    category: "Category",
    sellOrRent: "Sell or Rent",
    rent: "Rent",
    fixedPrice: "Fixed Price",
    image: "Image URL",
    postAd: "Post Ad",

    // Home
    home: "Home",
    dashboard: "Home",
    cropDisease: "Crop Disease",
    governmentSchemes: "Govt Schemes",
    tipOfDay: "Tip of the Day",

    // Crop Disease Detection
    cropDiseaseDetection: "Crop Disease Detection",
    selectLanguage: "Select Language",
    uploadImage: "Upload or Capture Image",
    chooseGallery: "Choose from Gallery",
    takePhoto: "Take Photo",
    analyzing: "Analyzing...",
    results: "Results",
    confidence: "Confidence",
    treatments: "Treatments",
    preventions: "Preventions",
    askChatbot: "Ask AI Assistant",

    // Register
    username: "Username",
    confirmPassword: "Confirm Password",
    signIn: "Sign In",
  },

  [Language.HI]: {
    // App
    appName: "Agri-Predict",
    logout: "लॉगआउट",

    // Auth
    loginTitle: "वापस स्वागत है 👨‍🌾",
    email: "ईमेल पता",
    password: "पासवर्ड",
    login: "लॉगिन",
    noAccount: "खाता नहीं है?",
    signUp: "साइन अप",
    registerTitle: "खाता बनाएं",
    name: "पूरा नाम",
    phone: "फोन नंबर",
    state: "राज्य",
    city: "शहर",
    register: "पंजीकरण",
    haveAccount: "पहले से खाता है?",

    //Dashboard
    Home: "मुख्यपृष्ठ",
    detectDisease: "रोग पहचानें",
    viewSchemes: "योजनाएं देखें",
    sellProduct: "बाज़ार",
    chatWithAI: "AI से बात करें",
    goodMorning: "सुप्रभात",
    farmingTips: "आज की सलाह",
    quickActions: "त्वरित कार्य",

    // AI Chatbot
    aiAssistant: "AI कृषि सहायक",
    chatPlaceholder: "अपनी फसल के बारे में पूछें...",

    // Government Schemes
    govtSchemes: "सरकारी योजनाएं",
    searchSchemes: "योजनाएं खोजें...",
    eligibility: "पात्रता",
    benefits: "लाभ",
    officialLink: "आधिकारिक लिंक",
    documents: "आवश्यक दस्तावेज़",
    howToApply: "आवेदन कैसे करें",

    // Marketplace
    marketplace: "बाज़ार",
    buy: "खरीदें",
    sell: "बेचें",
    searchProducts: "उत्पाद खोजें...",
    allCategories: "सभी",
    crops: "फसलें",
    fertilizers: "उर्वरक",
    machineries: "मशीनरी",
    chemicals: "रसायन",
    price: "कीमत",
    quantity: "मात्रा",
    unit: "इकाई",
    addProduct: "उत्पाद जोड़ें",
    productName: "उत्पाद का नाम",
    selectCategory: "श्रेणी चुनें",
    description: "विवरण",
    perHour: "प्रति घंटा",
    perKg: "प्रति किलो",
    perLitre: "प्रति लीटर",
    expiryDate: "समाप्ति तिथि",
    contactSeller: "विक्रेता से संपर्क करें",
    sellYourProduct: "अपना उत्पाद बेचें",
    category: "श्रेणी",
    sellOrRent: "बेचें या किराए पर दें",
    rent: "किराया",
    fixedPrice: "निश्चित मूल्य",
    image: "छवि URL",
    postAd: "विज्ञापन पोस्ट करें",

    // Home
    home: "होम",
    cropDisease: "फसल रोग",
    governmentSchemes: "सरकारी योजनाएं",
    tipOfDay: "आज की सलाह",

    // Crop Disease Detection
    cropDiseaseDetection: "फसल रोग पहचान",
    selectLanguage: "भाषा चुनें",
    uploadImage: "छवि अपलोड करें या कैप्चर करें",
    chooseGallery: "गैलरी से चुनें",
    takePhoto: "फोटो लें",
    analyzing: "विश्लेषण हो रहा है...",
    results: "परिणाम",
    confidence: "विश्वास",
    treatments: "उपचार",
    preventions: "रोकथाम",
    askChatbot: "AI सहायक से पूछें",

    // Register
    username: "उपयोगकर्ता नाम",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    signIn: "साइन इन",
  },

  [Language.MR]: {
    // App
    appName: "Agri-Predict",
    logout: "लॉगआउट",

    // Auth
    loginTitle: "पुन्हा स्वागत आहे 👨‍🌾",
    email: "ईमेल पत्ता",
    password: "पासवर्ड",
    login: "लॉगिन",
    noAccount: "खाते नाही?",
    signUp: "साइन अप",
    registerTitle: "खाते तयार करा",
    name: "पूर्ण नाव",
    phone: "फोन नंबर",
    state: "राज्य",
    city: "शहर",
    register: "नोंदणी करा",
    haveAccount: "आधीच खाते आहे?",

    //Dashboard
    Home: "मुख्यपृष्ठ",
    detectDisease: "रोग ओळखा",
    viewSchemes: "योजना पहा",
    sellProduct: "बाजारपेठ",
    chatWithAI: "AI शी बोला",
    goodMorning: "सुप्रभात",
    farmingTips: "आजची टीप",
    quickActions: "त्वरित क्रिया",

    // AI Chatbot
    aiAssistant: "AI शेती सहाय्यक",
    chatPlaceholder: "तुमच्या पिकाबद्दल विचारा...",

    // Government Schemes
    govtSchemes: "सरकारी योजना",
    searchSchemes: "योजना शोधा...",
    eligibility: "पात्रता",
    benefits: "फायदे",
    officialLink: "अधिकृत लिंक",
    documents: "आवश्यक कागदपत्रे",
    howToApply: "अर्ज कसा करावा",

    // Marketplace
    marketplace: "बाजारपेठ",
    buy: "खरेदी करा",
    sell: "विका",
    searchProducts: "उत्पादने शोधा...",
    allCategories: "सर्व",
    crops: "पिके",
    fertilizers: "खते",
    machineries: "यंत्रसामग्री",
    chemicals: "रसायने",
    price: "किंमत",
    quantity: "प्रमाण",
    unit: "एकक",
    addProduct: "उत्पादन जोडा",
    productName: "उत्पादनाचे नाव",
    selectCategory: "श्रेणी निवडा",
    description: "वर्णन",
    perHour: "प्रति तास",
    perKg: "प्रति किलो",
    perLitre: "प्रति लिटर",
    expiryDate: "कालबाह्य तारीख",
    contactSeller: "विक्रेत्याशी संपर्क करा",
    sellYourProduct: "तुमचे उत्पादन विका",
    category: "श्रेणी",
    sellOrRent: "विका किंवा भाड्याने द्या",
    rent: "भाडे",
    fixedPrice: "निश्चित किंमत",
    image: "प्रतिमा URL",
    postAd: "जाहिरात पोस्ट करा",

    // Home
    home: "मुख्यपृष्ठ",
    cropDisease: "पीक रोग",
    governmentSchemes: "सरकारी योजना",
    tipOfDay: "आजची टीप",

    // Crop Disease Detection
    cropDiseaseDetection: "पीक रोग ओळख",
    selectLanguage: "भाषा निवडा",
    uploadImage: "प्रतिमा अपलोड करा किंवा कॅप्चर करा",
    chooseGallery: "गॅलरीतून निवडा",
    takePhoto: "फोटो काढा",
    analyzing: "विश्लेषण होत आहे...",
    results: "परिणाम",
    confidence: "विश्वास",
    treatments: "उपचार",
    preventions: "प्रतिबंध",
    askChatbot: "AI सहाय्यकाला विचारा",

    // Register
    username: "वापरकर्तानाव",
    confirmPassword: "पासवर्ड पुष्टी करा",
    signIn: "साइन इन",
  },
};

export const MOCK_SCHEMES: GovernmentScheme[] = [
  {
    id: "1",
    title: {
      [Language.EN]: "PM Kisan Samman Nidhi",
      [Language.HI]: "पीएम किसान सम्मान निधि",
      [Language.MR]: "पीएम किसान सन्मान निधी",
    },
    description: {
      [Language.EN]:
        "Direct income support of ₹6,000 per year to farmer families in three equal installments of ₹2,000 each.",
      [Language.HI]:
        "किसान परिवारों को प्रति वर्ष ₹6,000 की सीधी आय सहायता, ₹2,000 की तीन समान किस्तों में।",
      [Language.MR]:
        "शेतकरी कुटुंबांना दरवर्षी ₹6,000 थेट उत्पन्न सहाय्य, ₹2,000 च्या तीन समान हप्त्यांमध्ये.",
    },
    eligibility: {
      [Language.EN]:
        "All landholding farmer families with cultivable land. Excludes institutional landholders and government employees.",
      [Language.HI]:
        "कृषि योग्य भूमि वाले सभी भूधारक किसान परिवार। संस्थागत भूधारकों और सरकारी कर्मचारियों को छोड़कर।",
      [Language.MR]:
        "लागवडयोग्य जमीन असलेले सर्व जमीनधारक शेतकरी कुटुंब. संस्थात्मक जमीनधारक आणि सरकारी कर्मचारी वगळून.",
    },
    benefits: {
      [Language.EN]:
        "₹6,000 per year directly to bank account in 3 installments of ₹2,000 every 4 months.",
      [Language.HI]:
        "हर 4 महीने में ₹2,000 की 3 किस्तों में सीधे बैंक खाते में ₹6,000 प्रति वर्ष।",
      [Language.MR]:
        "दर 4 महिन्यांनी ₹2,000 च्या 3 हप्त्यांमध्ये बँक खात्यात थेट ₹6,000 प्रतिवर्ष.",
    },
    documents: {
      [Language.EN]:
        "Aadhaar Card, Land Records (7/12), Bank Passbook, Mobile Number linked to Aadhaar",
      [Language.HI]:
        "आधार कार्ड, भूमि अभिलेख, बैंक पासबुक, आधार से जुड़ा मोबाइल नंबर",
      [Language.MR]:
        "आधार कार्ड, जमीन नोंदी (7/12), बँक पासबुक, आधारशी जोडलेला मोबाइल नंबर",
    },
    howToApply: {
      [Language.EN]:
        "1. Visit pmkisan.gov.in\n2. Click 'Farmer Corner'\n3. Click 'New Farmer Registration'\n4. Fill Aadhaar number and details\n5. Submit and get registration number\nOR visit nearest Common Service Centre (CSC)",
      [Language.HI]:
        "1. pmkisan.gov.in पर जाएं\n2. 'किसान कोना' पर क्लिक करें\n3. 'नया किसान पंजीकरण' पर क्लिक करें\n4. आधार नंबर और विवरण भरें\n5. सबमिट करें\nया नजदीकी CSC केंद्र पर जाएं",
      [Language.MR]:
        "1. pmkisan.gov.in ला भेट द्या\n2. 'शेतकरी कोपरा' वर क्लिक करा\n3. 'नवीन शेतकरी नोंदणी' वर क्लिक करा\n4. आधार नंबर आणि तपशील भरा\n5. सबमिट करा\nकिंवा जवळच्या CSC केंद्राला भेट द्या",
    },
    link: "https://pmkisan.gov.in",
  },
  {
    id: "2",
    title: {
      [Language.EN]: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      [Language.HI]: "प्रधानमंत्री फसल बीमा योजना",
      [Language.MR]: "प्रधानमंत्री पीक विमा योजना",
    },
    description: {
      [Language.EN]:
        "Crop insurance scheme providing financial support to farmers suffering crop loss due to natural calamities, pests and diseases.",
      [Language.HI]:
        "प्राकृतिक आपदाओं, कीटों और बीमारियों के कारण फसल नुकसान झेलने वाले किसानों को वित्तीय सहायता।",
      [Language.MR]:
        "नैसर्गिक आपत्ती, कीड आणि रोगांमुळे पीक नुकसान झालेल्या शेतकऱ्यांना आर्थिक सहाय्य.",
    },
    eligibility: {
      [Language.EN]:
        "All farmers including sharecroppers and tenant farmers growing notified crops. Compulsory for loanee farmers, voluntary for others.",
      [Language.HI]:
        "अधिसूचित फसलें उगाने वाले सभी किसान। ऋणी किसानों के लिए अनिवार्य, अन्य के लिए स्वैच्छिक।",
      [Language.MR]:
        "अधिसूचित पिके घेणारे सर्व शेतकरी. कर्जदार शेतकऱ्यांसाठी अनिवार्य, इतरांसाठी ऐच्छिक.",
    },
    benefits: {
      [Language.EN]:
        "Premium: 2% for Kharif, 1.5% for Rabi, 5% for commercial crops. Full insurance cover against crop loss.",
      [Language.HI]:
        "प्रीमियम: खरीफ 2%, रबी 1.5%, वाणिज्यिक फसलों 5%। फसल नुकसान के लिए पूरा बीमा कवर।",
      [Language.MR]:
        "प्रीमियम: खरीफ 2%, रब्बी 1.5%, व्यावसायिक पिके 5%. पीक नुकसानीसाठी संपूर्ण विमा.",
    },
    documents: {
      [Language.EN]:
        "Aadhaar Card, Land Records (7/12), Bank Account Details, Sowing Certificate, Village Certificate",
      [Language.HI]:
        "आधार कार्ड, भूमि अभिलेख, बैंक खाता विवरण, बुवाई प्रमाण पत्र, ग्राम प्रमाण पत्र",
      [Language.MR]:
        "आधार कार्ड, जमीन नोंदी (7/12), बँक खाते तपशील, पेरणी प्रमाणपत्र, गाव प्रमाणपत्र",
    },
    howToApply: {
      [Language.EN]:
        "1. Visit pmfby.gov.in\n2. Register as farmer\n3. Select your crop and area\n4. Pay premium amount\n5. Get policy number\nOR apply through nearest bank branch before cutoff date",
      [Language.HI]:
        "1. pmfby.gov.in पर जाएं\n2. किसान के रूप में पंजीकरण करें\n3. फसल और क्षेत्र चुनें\n4. प्रीमियम भुगतान करें\n5. पॉलिसी नंबर प्राप्त करें",
      [Language.MR]:
        "1. pmfby.gov.in ला भेट द्या\n2. शेतकरी म्हणून नोंदणी करा\n3. पीक आणि क्षेत्र निवडा\n4. प्रीमियम भरा\n5. पॉलिसी नंबर मिळवा",
    },
    link: "https://pmfby.gov.in",
  },
  {
    id: "3",
    title: {
      [Language.EN]: "Kisan Credit Card (KCC)",
      [Language.HI]: "किसान क्रेडिट कार्ड",
      [Language.MR]: "किसान क्रेडिट कार्ड",
    },
    description: {
      [Language.EN]:
        "Provides farmers with affordable credit for agricultural needs including cultivation, post-harvest expenses and maintenance.",
      [Language.HI]:
        "किसानों को खेती, कटाई के बाद के खर्च और रखरखाव के लिए किफायती ऋण प्रदान करता है।",
      [Language.MR]:
        "शेतकऱ्यांना लागवड, काढणीनंतरचा खर्च आणि देखभालीसाठी परवडणारे कर्ज.",
    },
    eligibility: {
      [Language.EN]:
        "All farmers, sharecroppers, oral lessees, tenant farmers, SHGs and JLGs of farmers.",
      [Language.HI]:
        "सभी किसान, बटाईदार, मौखिक पट्टेदार, किरायेदार किसान, SHG और JLG।",
      [Language.MR]:
        "सर्व शेतकरी, भागधारक, तोंडी भाडेकरू, भाडेकरू शेतकरी, SHG आणि JLG.",
    },
    benefits: {
      [Language.EN]:
        "Credit up to ₹3 lakh at 4% interest per year. Flexible repayment. No collateral up to ₹1.6 lakh.",
      [Language.HI]:
        "4% वार्षिक ब्याज पर ₹3 लाख तक ऋण। लचीला पुनर्भुगतान। ₹1.6 लाख तक कोई संपार्श्विक नहीं।",
      [Language.MR]:
        "4% वार्षिक व्याजाने ₹3 लाखपर्यंत कर्ज. ₹1.6 लाखपर्यंत कोणतेही तारण नाही.",
    },
    documents: {
      [Language.EN]:
        "Aadhaar Card, PAN Card, Land Records (7/12), Passport Size Photo, Bank Account Details",
      [Language.HI]:
        "आधार कार्ड, पैन कार्ड, भूमि अभिलेख, पासपोर्ट साइज फोटो, बैंक खाता विवरण",
      [Language.MR]:
        "आधार कार्ड, पॅन कार्ड, जमीन नोंदी (7/12), पासपोर्ट साइज फोटो, बँक खाते तपशील",
    },
    howToApply: {
      [Language.EN]:
        "1. Visit nearest bank (SBI, PNB, cooperative bank)\n2. Ask for KCC application form\n3. Fill form with land and crop details\n4. Submit with required documents\n5. Card issued within 2 weeks after verification",
      [Language.HI]:
        "1. नजदीकी बैंक जाएं\n2. KCC आवेदन फॉर्म मांगें\n3. भूमि और फसल विवरण भरें\n4. दस्तावेजों के साथ जमा करें\n5. 2 सप्ताह में कार्ड जारी",
      [Language.MR]:
        "1. जवळच्या बँकेला भेट द्या\n2. KCC अर्ज फॉर्म मागा\n3. जमीन आणि पीक तपशील भरा\n4. कागदपत्रांसह सबमिट करा\n5. 2 आठवड्यांत कार्ड जारी",
    },
    link: "https://www.india.gov.in/spotlight/kisan-credit-card",
  },
  {
    id: "4",
    title: {
      [Language.EN]: "PM Krishi Sinchai Yojana (PMKSY)",
      [Language.HI]: "प्रधानमंत्री कृषि सिंचाई योजना",
      [Language.MR]: "प्रधानमंत्री कृषी सिंचन योजना",
    },
    description: {
      [Language.EN]:
        "'Har Khet Ko Pani, More Crop Per Drop' — ensures access to water for every farm and improves water use efficiency.",
      [Language.HI]:
        "'हर खेत को पानी' — हर खेत को पानी सुनिश्चित करता है और जल उपयोग दक्षता में सुधार करता है।",
      [Language.MR]:
        "'हर खेत को पानी' — प्रत्येक शेताला पाणी सुनिश्चित करते आणि पाणी वापर कार्यक्षमता सुधारते.",
    },
    eligibility: {
      [Language.EN]:
        "All farmers. Special focus on small and marginal farmers. 55% subsidy on micro-irrigation (SC/ST get 45% extra).",
      [Language.HI]:
        "सभी किसान। छोटे किसानों पर विशेष ध्यान। सूक्ष्म सिंचाई पर 55% सब्सिडी।",
      [Language.MR]:
        "सर्व शेतकरी. लहान शेतकऱ्यांवर विशेष लक्ष. सूक्ष्म सिंचनावर 55% अनुदान.",
    },
    benefits: {
      [Language.EN]:
        "55% subsidy on drip/sprinkler irrigation for general farmers, 45% additional for SC/ST. Reduces water usage by 40-50%.",
      [Language.HI]:
        "सामान्य किसानों के लिए 55% सब्सिडी, SC/ST के लिए अतिरिक्त 45%। पानी उपयोग 40-50% कम।",
      [Language.MR]:
        "सामान्य शेतकऱ्यांसाठी 55% अनुदान, SC/ST साठी अतिरिक्त 45%. पाणी वापर 40-50% कमी.",
    },
    documents: {
      [Language.EN]:
        "Aadhaar Card, Land Records (7/12), Bank Account Details, Caste Certificate (if SC/ST), Vendor Quotation",
      [Language.HI]:
        "आधार कार्ड, भूमि अभिलेख, बैंक खाता, जाति प्रमाण पत्र (SC/ST), विक्रेता कोटेशन",
      [Language.MR]:
        "आधार कार्ड, जमीन नोंदी (7/12), बँक खाते, जात प्रमाणपत्र (SC/ST), विक्रेता कोटेशन",
    },
    howToApply: {
      [Language.EN]:
        "1. Visit pmksy.gov.in\n2. Register on the portal\n3. Select state and district\n4. Choose irrigation type\n5. Submit with documents\n6. Subsidy credited after inspection",
      [Language.HI]:
        "1. pmksy.gov.in पर जाएं\n2. पोर्टल पर पंजीकरण करें\n3. राज्य और जिला चुनें\n4. सिंचाई प्रकार चुनें\n5. दस्तावेजों के साथ जमा करें\n6. निरीक्षण के बाद सब्सिडी",
      [Language.MR]:
        "1. pmksy.gov.in ला भेट द्या\n2. पोर्टलवर नोंदणी करा\n3. राज्य आणि जिल्हा निवडा\n4. सिंचन प्रकार निवडा\n5. कागदपत्रांसह अर्ज करा\n6. तपासणीनंतर अनुदान",
    },
    link: "https://pmksy.gov.in",
  },
  {
    id: "5",
    title: {
      [Language.EN]: "Soil Health Card Scheme",
      [Language.HI]: "मृदा स्वास्थ्य कार्ड योजना",
      [Language.MR]: "मृद आरोग्य कार्ड योजना",
    },
    description: {
      [Language.EN]:
        "Provides farmers with soil health cards containing crop-wise recommendations for nutrients and fertilizers for individual farms.",
      [Language.HI]:
        "किसानों को मृदा स्वास्थ्य कार्ड प्रदान करता है जिसमें पोषक तत्वों और उर्वरकों की फसलवार सिफारिशें होती हैं।",
      [Language.MR]:
        "शेतकऱ्यांना मृद आरोग्य कार्ड प्रदान करते ज्यात पोषक तत्वे आणि खतांच्या पीकनिहाय शिफारसी असतात.",
    },
    eligibility: {
      [Language.EN]:
        "All farmers across India. FREE of cost. Soil testing done once every 2 years.",
      [Language.HI]:
        "भारत भर के सभी किसान। पूरी तरह मुफ्त। हर 2 साल में एक बार मिट्टी परीक्षण।",
      [Language.MR]:
        "भारतभरातील सर्व शेतकरी. पूर्णपणे मोफत. दर 2 वर्षांनी एकदा माती परीक्षण.",
    },
    benefits: {
      [Language.EN]:
        "FREE soil testing. Fertilizer recommendations reduce costs by 8-10%. Improves crop yield by 5-6%.",
      [Language.HI]:
        "मुफ्त मिट्टी परीक्षण। उर्वरक लागत 8-10% कम। फसल उपज में 5-6% सुधार।",
      [Language.MR]:
        "मोफत माती परीक्षण. खत खर्च 8-10% कमी. पीक उत्पादनात 5-6% सुधारणा.",
    },
    documents: {
      [Language.EN]: "Aadhaar Card, Land Records (7/12), Mobile Number",
      [Language.HI]: "आधार कार्ड, भूमि अभिलेख, मोबाइल नंबर",
      [Language.MR]: "आधार कार्ड, जमीन नोंदी (7/12), मोबाइल नंबर",
    },
    howToApply: {
      [Language.EN]:
        "1. Visit soilhealth.dac.gov.in\n2. Contact local agriculture department\n3. Provide soil sample from your farm\n4. Receive Soil Health Card within 30 days\n5. Follow fertilizer recommendations",
      [Language.HI]:
        "1. soilhealth.dac.gov.in पर जाएं\n2. स्थानीय कृषि विभाग से संपर्क करें\n3. मिट्टी का नमूना दें\n4. 30 दिनों में मृदा स्वास्थ्य कार्ड\n5. उर्वरक सिफारिशों का पालन करें",
      [Language.MR]:
        "1. soilhealth.dac.gov.in ला भेट द्या\n2. स्थानिक कृषी विभागाशी संपर्क साधा\n3. माती नमुना द्या\n4. 30 दिवसांत मृद आरोग्य कार्ड\n5. खत शिफारसींचे पालन करा",
    },
    link: "https://soilhealth.dac.gov.in",
  },
];
