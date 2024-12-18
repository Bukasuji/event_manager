const events = [
    {
        "event_name": "Cloud Innovation Summit",
        "date": "2024-10-15",
        "speaker": "John Doe",
        "status": "completed"
    },
    {
        "event_name": "Blockchain Revolution Conference",
        "date": "2024-11-03",
        "speaker": "Jane Smith",
        "status": "not completed"
    },
    {
        "event_name": "AI in Healthcare Symposium",
        "date": "2024-09-27",
        "speaker": "Alice Johnson",
        "status": "completed"
    },
    {
        "event_name": "Future of Fintech Forum",
        "date": "2024-12-12",
        "speaker": "Michael Brown",
        "status": "not completed"
    },
    {
        "event_name": "Cybersecurity in 2024",
        "date": "2024-08-30",
        "speaker": "Emily Davis",
        "status": "completed"
    },
    {
        "event_name": "Data Analytics in Business",
        "date": "2024-10-25",
        "speaker": "Robert Wilson",
        "status": "not completed"
    },
    {
        "event_name": "Tech Innovation Summit",
        "date": "2024-10-15",
        "speaker": "John Doe",
        "status": "completed"
    },
    {
        "event_name": "AI and the Future",
        "date": "2024-11-03",
        "speaker": "Jane Smith",
        "status": "not completed"
    },
    {
        "event_name": "Blockchain for Business",
        "date": "2024-09-27",
        "speaker": "Alice Johnson",
        "status": "completed"
    },
    {
        "event_name": "Web3 and Decentralization",
        "date": "2024-12-12",
        "speaker": "Michael Brown",
        "status": "not completed"
    },
    {
        "event_name": "Cybersecurity in 2024",
        "date": "2024-08-30",
        "speaker": "Emily Davis",
        "status": "completed"
    },
    {
        "event_name": "Machine Learning Workshop",
        "date": "2024-10-25",
        "speaker": "Robert Wilson",
        "status": "not completed"
    },
    {
        "event_name": "Internet of Things (IoT) Conference",
        "date": "2024-07-18",
        "speaker": "Sarah Lee",
        "status": "completed"
    },
    {
        "event_name": "Digital Transformation Summit",
        "date": "2024-09-05",
        "speaker": "David Thomas",
        "status": "completed"
    },
    {
        "event_name": "Cloud Computing Expo",
        "date": "2024-11-15",
        "speaker": "Jennifer Carter",
        "status": "not completed"
    },
    {
        "event_name": "Big Data Analytics Forum",
        "date": "2024-12-20",
        "speaker": "Eric Hill",
        "status": "not completed"
    },
    {
        "event_name": "Artificial Intelligence Conference",
        "date": "2025-01-10",
        "speaker": "Olivia Baker",
        "status": "not completed"
    },
    {
        "event_name": "Cybersecurity Summit",
        "date": "2025-02-15",
        "speaker": "William Green",
        "status": "not completed"
    },
    {
        "event_name": "Data Science Conference",
        "date": "2025-03-20",
        "speaker": "Amanda Harris",
        "status": "not completed"
    },

    {
        "event_name": "Data Science Conference",
        "date": "2025-03-20",
        "speaker": "Amanda Harris",
        "status": "not completed"
    }
]


const firebaseConfig = {
    apiKey: "AIzaSyAm6zQMX9taoIkx4KARpSYUtiIpbIHRAIs",
    authDomain: "event-management-28f26.firebaseapp.com",
    projectId: "event-management-28f26",
    storageBucket: "event-management-28f26.appspot.com",
    messagingSenderId: "149338795637",
    appId: "1:149338795637:web:52fb194548706d8cb5923c",
    measurementId: "G-QCV25B03E5"
  }

          // Initialize Firebase
          const app = initializeApp(firebaseConfig);
          const analytics = getAnalytics(app);

          // Initialize Firestore
    const db = firebase.firestore();

async function addJsonToFirestore() {
    events.forEach(async (event) => {
      try {
        await db.collection("events").add({
          event_name: event.event_name,
          date: event.date,
          speaker: event.speaker,
          status: event.status
        });
        console.log(`${event.event_name} added to Firestore`);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    });
  }

  console.log('active')
  
  // Call the function to add data
  addJsonToFirestore();
  