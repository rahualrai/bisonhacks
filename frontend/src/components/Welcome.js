// src/components/Welcome.js
import React, { useState, useEffect } from "react"
import { auth } from "../firebase"
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { useUser } from "../context/UserContext"
import "../Auth.css"
import "./Scholarship.css"
import axios from "axios"
import { Route } from "lucide-react"

// Updated mock scholarship data (requirements field still exists but isn't used)
const scholarships = [
  {
    scholarship_id: "SCH001",
    name: "Tech Innovators Grant",
    deadline: "2025-04-15",
    amount: 5000.0,
    description:
      "For students pursuing degrees in technology and innovation fields. Applicants must showcase creativity in problem-solving and innovation. Open to all ethnicities and states. Preference given to Computer Science, Engineering, and Data Science students. Freshmen, Sophomores, and Juniors are encouraged to apply.",
  },
  {
    scholarship_id: "SCH002",
    name: "Future Leaders Scholarship",
    deadline: "2025-06-30",
    amount: 10000.0,
    description:
      "Awarded to students demonstrating outstanding leadership potential. Applicants must showcase leadership in school, community, or extracurricular activities. Open to all majors and all U.S. states. Preference is given to students from minority backgrounds. Juniors and Seniors are highly encouraged to apply.",
  },
  {
    scholarship_id: "SCH003",
    name: "Women in STEM Award",
    deadline: "2025-05-10",
    amount: 7500.0,
    description:
      "Scholarship for female students in science, technology, engineering, or mathematics. It aims to support and encourage women entering STEM fields. Applicants must demonstrate academic excellence and commitment to their field. Open to all ethnicities and U.S. states. Freshmen and Sophomores are highly encouraged to apply.",
  },
  {
    scholarship_id: "SCH004",
    name: "Hispanic Heritage Achievement Scholarship",
    deadline: "2025-07-15",
    amount: 5000.0,
    description:
      "Awarded to students of Hispanic heritage who demonstrate academic excellence. This scholarship supports students pursuing any field of study. Applicants must showcase leadership, community involvement, and a commitment to cultural heritage. Open to all U.S. states. All year levels are welcome to apply.",
  },
  {
    scholarship_id: "SCH005",
    name: "Native American Education Fund",
    deadline: "2025-08-20",
    amount: 6000.0,
    description:
      "This scholarship supports Native American students who seek higher education. Applicants must be affiliated with a recognized tribe and demonstrate academic commitment. Open to all majors and U.S. states. Preference is given to students studying History, Social Sciences, or Environmental Studies. All year levels can apply.",
  },
  {
    scholarship_id: "SCH006",
    name: "African American Future Leaders Award",
    deadline: "2025-09-10",
    amount: 7500.0,
    description:
      "Designed for African American students who show promise in leadership and academics. Applicants must submit an essay detailing their career aspirations and community contributions. Open to all majors and U.S. states. Preference is given to students involved in social justice or advocacy work. Sophomores, Juniors, and Seniors are encouraged to apply.",
  },
  {
    scholarship_id: "SCH007",
    name: "LGBTQ+ Equality Scholarship",
    deadline: "2025-09-30",
    amount: 7000.0,
    description:
      "Supports LGBTQ+ students who advocate for equality and inclusivity. Applicants must demonstrate involvement in LGBTQ+ community work or activism. Open to all ethnicities and U.S. states. Preference is given to students pursuing Sociology, Political Science, or Gender Studies. Freshmen and Juniors are encouraged to apply.",
  },
  {
    scholarship_id: "SCH008",
    name: "Engineering Excellence Grant",
    deadline: "2025-10-01",
    amount: 9000.0,
    description:
      "Awarded to students who excel in engineering disciplines. Applicants must provide a project proposal or research idea in their engineering field. Open to all U.S. states and ethnicities. Juniors and Seniors majoring in Mechanical, Civil, or Electrical Engineering are preferred. Female applicants are highly encouraged.",
  },
  {
    scholarship_id: "SCH009",
    name: "Veterans Scholarship Fund",
    deadline: "2025-11-15",
    amount: 8000.0,
    description:
      "Available to students who have served in the military or are dependents of veterans. Applicants must demonstrate financial need and academic dedication. Open to all U.S. states, majors, and ethnicities. Preference is given to students in healthcare, business, or engineering fields. All year levels can apply.",
  },
  {
    scholarship_id: "SCH010",
    name: "Medical Studies Achievement Scholarship",
    deadline: "2025-12-01",
    amount: 10000.0,
    description:
      "For students pursuing careers in healthcare and medical fields. Applicants must demonstrate dedication to medicine through academic excellence and community service. Open to all ethnicities and U.S. states. Preference is given to students in Nursing, Pre-Med, or Biomedical Sciences. Juniors and Seniors are highly encouraged to apply.",
  }
]

// Award Amount range arrays
const awardAmounts = [
  "$0-$1,000",
  "$1,001 - $2,500",
  "$2,501 - $5,000",
  "$5,001 - $10,000",
  "More than $10,000",
]

const Welcome = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [scholarships, setScholarships] = useState([])
  const navigate = useNavigate()
  const user = useUser()

  // State management
  const [selectedAwardAmounts, setSelectedAwardAmounts] = useState([])
  const [sortOrder, setSortOrder] = useState("Sort By")
  const [expandedCards, setExpandedCards] = useState({})

  // // --- New function to handle AI button click ---
  // const handleAIChat = (scholarshipId) => {
  //   // user.uid is used as the user ID
  //   // We'll pass userId and scholarshipId in the query params
  //   navigate(
  //     `/chatbot?userId=${user.uid}&scholarshipId=${scholarshipId}`,
  //     { replace: false }
  //   )
  // }

  // --- Function to handle AI button click ---
  const handleAIChat = (scholarshipId, scholarship_name) => {
    const userId = user?.uid || "guest" // Fallback for user ID if not logged in

    //  Console logging userId and scholarshipId
    console.log("AI Button Clicked!")
    console.log("User ID:", userId)
    console.log("Scholarship ID:", scholarshipId)

    //  Navigate to chatbot page with parameters
    const chatUrl = `/chatbot?userId=${userId}&scholarshipId=${scholarshipId}&scholarship_name=${scholarship_name}`;
    window.open(chatUrl, "_blank");


  }

  useEffect(() => {
    const url = "http://localhost:5001/bisonhack-9f9a6/us-central1/getscholarships";
    const userId = "4auyMYAj7QSYuLlLRppHtGvSkoj1" // Fallback for user ID if not logged in

    const form = new FormData();
    form.append("uid", userId)

    axios.post(url, form).then(data => {

      setScholarships(data.data.scholarships)

      console.log(data.data.scholarships)
    }
    )


  }, []);

  const handleLogout = async () => {
    await signOut(auth)
    navigate("/login")
  }

  const toggleExpanded = (id) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleAwardAmountClick = (amount) => {
    setSelectedAwardAmounts((prev) =>
      prev.includes(amount)
        ? prev.filter((item) => item !== amount)
        : [...prev, amount]
    )
  }

  // Filter & Sort
  const filterScholarships = () => {
    return scholarships.filter((sch) => {
      // Award Amount filter
      if (selectedAwardAmounts.length > 0) {
        const matchesAnyRange = selectedAwardAmounts.some((rangeString) => {
          switch (rangeString) {
            case "$0-$1,000":
              return sch.amount >= 0 && sch.amount <= 1000
            case "$1,001 - $2,500":
              return sch.amount >= 1001 && sch.amount <= 2500
            case "$2,501 - $5,000":
              return sch.amount >= 2501 && sch.amount <= 5000
            case "$5,001 - $10,000":
              return sch.amount >= 5001 && sch.amount <= 10000
            case "More than $10,000":
              return sch.amount > 10000
            default:
              return true
          }
        })
        if (!matchesAnyRange) {
          return false
        }
      }
      return true
    })
  }

  const getSortedScholarships = () => {
    let filtered = filterScholarships()
    if (sortOrder === "Amount: High to Low") {
      filtered.sort((a, b) => b.amount - a.amount)
    } else if (sortOrder === "Amount: Low to High") {
      filtered.sort((a, b) => a.amount - b.amount)
    } else if (sortOrder === "Deadline: Soonest") {
      filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    }
    return filtered
  }

  const featuredScholarships = [...scholarships]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3)

  const finalScholarships = getSortedScholarships()

  if (user.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo">iScholars</div>
          <div className="navbar-right">
            <div className="user-greeting">
              Welcome back, <span>{user.name}</span>
            </div>
            <button onClick={handleLogout} className="navbar-button">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {/* Featured Scholarships */}
        <section className="featured-section">
          <h1>Featured Scholarships</h1>
          <div className="featured-grid">
            {featuredScholarships.map((sch) => (
              <div key={sch.scholarship_id} className="featured-card">
                <div className="premier-tag">Premier</div>
                <h3>{sch.scholarship_name}</h3>
                <p className="no-essay">No essay</p>
                <div className="amount">${sch.amount.toLocaleString()}</div>
                <button className="apply-button" onClick={() => window.open(sch.link, "_blank")}>
                  Apply Now <span>→</span>
                </button>

                {/* --- AI Button in bottom-right --- */}
                <button
                  className="ai-button"
                  onClick={() => handleAIChat(sch.scholarship_id, sch.scholarship_name)}
                >
                  <img src={require("../assets/ai.png")} alt="AI" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Scholarship Search */}
        <section className="search-section">
          <h2>Find the right scholarships for you</h2>

          {/* Award Amount Filters */}
          <div className="categories">
            <h3>Award Amount</h3>
            <div className="category-buttons">
              {awardAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleAwardAmountClick(amount)}
                  className={`category-button ${selectedAwardAmounts.includes(amount) ? "selected" : ""
                    }`}
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>

          {/* Full Width Scholarship List */}
          <div className="scholarship-list-container">
            {/* Results Header */}
            <div className="results-header">
              <div className="results-count">
                Results · {finalScholarships.length}
              </div>
              <select
                className="sort-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option>Sort By</option>
                <option>Amount: High to Low</option>
                <option>Amount: Low to High</option>
                <option>Deadline: Soonest</option>
              </select>
            </div>

            {/* Scholarship Cards */}
            <div className="scholarship-list">
              {finalScholarships.map((scholarship) => (
                <div key={scholarship.scholarship_id} className="scholarship-card">
                  <div className="scholarship-content">
                    <div className="scholarship-info">
                      <h3>{scholarship.scholarship_name}</h3>
                      <div className="deadline">
                        Due: {new Date(scholarship.deadline).toLocaleDateString()}
                      </div>
                      <p>
                        {expandedCards[scholarship.scholarship_id]
                          ? scholarship.description
                          : scholarship.description.slice(0, 250) +
                          (scholarship.description.length > 100 ? "..." : "")}
                      </p>
                      {scholarship.description.length > 100 && (
                        <button
                          onClick={() => toggleExpanded(scholarship.scholarship_id)}
                          className="see-more-button"
                        >
                          {expandedCards[scholarship.scholarship_id]
                            ? "Show Less"
                            : "Read More"}
                        </button>
                      )}
                    </div>
                    <div className="scholarship-action">
                      <div className="amount">${scholarship.amount.toLocaleString()}</div>
                      <button className="apply-button" onClick={() => window.open(scholarship.link, "_blank")}>Apply now</button>
                    </div>
                  </div>

                  {/* --- AI Button in bottom-right --- */}
                  <button
                    className="ai-button"
                    onClick={() => handleAIChat(scholarship.scholarship_id, scholarship.scholarship_name)}
                  >
                    <img src={require("../assets/ai.png")} alt="AI" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Welcome




// // src/components/Welcome.js
// import React, { useState } from "react"
// import { auth } from "../firebase"
// import { signOut } from "firebase/auth"
// import { useNavigate } from "react-router-dom"
// import { useUser } from "../context/UserContext"
// import "../Auth.css"
// import "./Scholarship.css"

// // Keep all the existing arrays and data...
// // (scholarships, awardAmounts, etc.)


// // Updated mock scholarship data (requirements field still exists but isn't used)
// const scholarships = [
//   {
//     scholarship_id: "SCH001",
//     name: "Tech Innovators Grant",
//     deadline: "2025-04-15",
//     amount: 5000.0,
//     description:
//       "For students pursuing degrees in technology and innovation fields. Applicants must showcase creativity in problem-solving and innovation. Open to all ethnicities and states. Preference given to Computer Science, Engineering, and Data Science students. Freshmen, Sophomores, and Juniors are encouraged to apply.",

//   },
//   {
//     scholarship_id: "SCH002",
//     name: "Future Leaders Scholarship",
//     deadline: "2025-06-30",
//     amount: 10000.0,
//     description:
//       "Awarded to students demonstrating outstanding leadership potential. Applicants must showcase leadership in school, community, or extracurricular activities. Open to all majors and all U.S. states. Preference is given to students from minority backgrounds. Juniors and Seniors are highly encouraged to apply.",

//   },
//   {
//     scholarship_id: "SCH003",
//     name: "Women in STEM Award",
//     deadline: "2025-05-10",
//     amount: 7500.0,
//     description:
//       "Scholarship for female students in science, technology, engineering, or mathematics. It aims to support and encourage women entering STEM fields. Applicants must demonstrate academic excellence and commitment to their field. Open to all ethnicities and U.S. states. Freshmen and Sophomores are highly encouraged to apply.",

//   },
//   {
//     scholarship_id: "SCH004",
//     name: "Hispanic Heritage Achievement Scholarship",
//     deadline: "2025-07-15",
//     amount: 5000.0,
//     description:
//       "Awarded to students of Hispanic heritage who demonstrate academic excellence. This scholarship supports students pursuing any field of study. Applicants must showcase leadership, community involvement, and a commitment to cultural heritage. Open to all U.S. states. All year levels are welcome to apply.",

//   },
//   {
//     scholarship_id: "SCH005",
//     name: "Native American Education Fund",
//     deadline: "2025-08-20",
//     amount: 6000.0,
//     description:
//       "This scholarship supports Native American students who seek higher education. Applicants must be affiliated with a recognized tribe and demonstrate academic commitment. Open to all majors and U.S. states. Preference is given to students studying History, Social Sciences, or Environmental Studies. All year levels can apply.",

//   },
//   {
//     scholarship_id: "SCH006",
//     name: "African American Future Leaders Award",
//     deadline: "2025-09-10",
//     amount: 7500.0,
//     description:
//       "Designed for African American students who show promise in leadership and academics. Applicants must submit an essay detailing their career aspirations and community contributions. Open to all majors and U.S. states. Preference is given to students involved in social justice or advocacy work. Sophomores, Juniors, and Seniors are encouraged to apply.",

//   },
//   {
//     scholarship_id: "SCH007",
//     name: "LGBTQ+ Equality Scholarship",
//     deadline: "2025-09-30",
//     amount: 7000.0,
//     description:
//       "Supports LGBTQ+ students who advocate for equality and inclusivity. Applicants must demonstrate involvement in LGBTQ+ community work or activism. Open to all ethnicities and U.S. states. Preference is given to students pursuing Sociology, Political Science, or Gender Studies. Freshmen and Juniors are encouraged to apply.",

//   },
//   {
//     scholarship_id: "SCH008",
//     name: "Engineering Excellence Grant",
//     deadline: "2025-10-01",
//     amount: 9000.0,
//     description:
//       "Awarded to students who excel in engineering disciplines. Applicants must provide a project proposal or research idea in their engineering field. Open to all U.S. states and ethnicities. Juniors and Seniors majoring in Mechanical, Civil, or Electrical Engineering are preferred. Female applicants are highly encouraged.",

//   },
//   {
//     scholarship_id: "SCH009",
//     name: "Veterans Scholarship Fund",
//     deadline: "2025-11-15",
//     amount: 8000.0,
//     description:
//       "Available to students who have served in the military or are dependents of veterans. Applicants must demonstrate financial need and academic dedication. Open to all U.S. states, majors, and ethnicities. Preference is given to students in healthcare, business, or engineering fields. All year levels can apply.",

//   },
//   {
//     scholarship_id: "SCH010",
//     name: "Medical Studies Achievement Scholarship",
//     deadline: "2025-12-01",
//     amount: 10000.0,
//     description:
//       "For students pursuing careers in healthcare and medical fields. Applicants must demonstrate dedication to medicine through academic excellence and community service. Open to all ethnicities and U.S. states. Preference is given to students in Nursing, Pre-Med, or Biomedical Sciences. Juniors and Seniors are highly encouraged to apply.",

//   }
// ]

// // Award Amount range arrays
// const awardAmounts = [
//   "$0-$1,000",
//   "$1,001 - $2,500",
//   "$2,501 - $5,000",
//   "$5,001 - $10,000",
//   "More than $10,000",
// ]

// const Welcome = () => {
//   const navigate = useNavigate()
//   const user = useUser()

//   // State management
//   const [selectedAwardAmounts, setSelectedAwardAmounts] = useState([])
//   const [sortOrder, setSortOrder] = useState("Sort By")
//   const [expandedCards, setExpandedCards] = useState({})

//   const handleLogout = async () => {
//     await signOut(auth)
//     navigate("/login")
//   }

//   const toggleExpanded = (id) => {
//     setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }))
//   }

//   const handleAwardAmountClick = (amount) => {
//     setSelectedAwardAmounts((prev) =>
//       prev.includes(amount)
//         ? prev.filter((item) => item !== amount)
//         : [...prev, amount]
//     )
//   }

//   // Filter & Sort
//   const filterScholarships = () => {
//     return scholarships.filter((sch) => {
//       // Award Amount filter
//       if (selectedAwardAmounts.length > 0) {
//         const matchesAnyRange = selectedAwardAmounts.some((rangeString) => {
//           switch (rangeString) {
//             case "$0-$1,000":
//               return sch.amount >= 0 && sch.amount <= 1000
//             case "$1,001 - $2,500":
//               return sch.amount >= 1001 && sch.amount <= 2500
//             case "$2,501 - $5,000":
//               return sch.amount >= 2501 && sch.amount <= 5000
//             case "$5,001 - $10,000":
//               return sch.amount >= 5001 && sch.amount <= 10000
//             case "More than $10,000":
//               return sch.amount > 10000
//             default:
//               return true
//           }
//         })
//         if (!matchesAnyRange) {
//           return false
//         }
//       }
//       return true
//     })
//   }

//   const getSortedScholarships = () => {
//     let filtered = filterScholarships()
//     if (sortOrder === "Amount: High to Low") {
//       filtered.sort((a, b) => b.amount - a.amount)
//     } else if (sortOrder === "Amount: Low to High") {
//       filtered.sort((a, b) => a.amount - b.amount)
//     } else if (sortOrder === "Deadline: Soonest") {
//       filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
//     }
//     return filtered
//   }

//   const featuredScholarships = [...scholarships]
//     .sort((a, b) => b.amount - a.amount)
//     .slice(0, 3)

//   const finalScholarships = getSortedScholarships()

//   if (user.isLoading) {
//     return <div>Loading...</div>
//   }

//   return (
//     <div className="app">
//       <nav className="navbar">
//         <div className="navbar-content">
//           <div className="logo">iScholar</div>
//           <div className="navbar-right">
//             <div className="user-greeting">
//               Welcome back, <span>{user.name}</span>
//             </div>
//             <button onClick={handleLogout} className="navbar-button">
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>

//       <main className="main-content">
//         {/* Featured Scholarships */}
//         <section className="featured-section">
//           <h1>Featured Scholarships</h1>
//           <div className="featured-grid">
//             {featuredScholarships.map((sch) => (
//               <div key={sch.scholarship_id} className="featured-card">
//                 <div className="premier-tag">Premier</div>
//                 <h3>{sch.name}</h3>
//                 <p className="no-essay">No essay</p>
//                 <div className="amount">${sch.amount.toLocaleString()}</div>
//                 <button className="apply-button">
//                   Apply Now <span>→</span>
//                 </button>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Scholarship Search */}
//         <section className="search-section">
//           <h2>Find the right scholarships for you</h2>

//           {/* Award Amount Filters */}
//           <div className="categories">
//             <h3>Award Amount</h3>
//             <div className="category-buttons">
//               {awardAmounts.map((amount) => (
//                 <button
//                   key={amount}
//                   onClick={() => handleAwardAmountClick(amount)}
//                   className={`category-button ${
//                     selectedAwardAmounts.includes(amount) ? "selected" : ""
//                   }`}
//                 >
//                   {amount}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Full Width Scholarship List */}
//           <div className="scholarship-list-container">
//             {/* Results Header */}
//             <div className="results-header">
//               <div className="results-count">
//                 Results · {finalScholarships.length}
//               </div>
//               <select
//                 className="sort-select"
//                 value={sortOrder}
//                 onChange={(e) => setSortOrder(e.target.value)}
//               >
//                 <option>Sort By</option>
//                 <option>Amount: High to Low</option>
//                 <option>Amount: Low to High</option>
//                 <option>Deadline: Soonest</option>
//               </select>
//             </div>

//             {/* Scholarship Cards */}
//             <div className="scholarship-list">
//               {finalScholarships.map((scholarship) => (
//                 <div key={scholarship.scholarship_id} className="scholarship-card">
//                   <div className="scholarship-content">
//                     <div className="scholarship-info">
//                       <h3>{scholarship.name}</h3>
//                       <div className="deadline">
//                         Due: {new Date(scholarship.deadline).toLocaleDateString()}
//                       </div>
//                       <p>
//                         {expandedCards[scholarship.scholarship_id]
//                           ? scholarship.description
//                           : scholarship.description.slice(0, 250) +
//                             (scholarship.description.length > 100 ? "..." : "")}
//                       </p>
//                       {scholarship.description.length > 100 && (
//                         <button
//                           onClick={() => toggleExpanded(scholarship.scholarship_id)}
//                           className="see-more-button"
//                         >
//                           {expandedCards[scholarship.scholarship_id] ? "Show Less" : "Read More"}
//                         </button>
//                       )}
//                     </div>
//                     <div className="scholarship-action">
//                       <div className="amount">${scholarship.amount.toLocaleString()}</div>
//                       <button className="apply-button">Apply now</button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   )
// }

// export default Welcome




// // src/components/Welcome.js
// import React, { useState } from "react"
// import { auth } from "../firebase"
// import { signOut } from "firebase/auth"
// import { useNavigate } from "react-router-dom"
// import { useUser } from "../context/UserContext"
// import "../Auth.css"
// import "./Scholarship.css"

// // Updated mock scholarship data with requirements
// const scholarships = [
//   {
//     scholarship_id: "SCH001",
//     name: "Tech Innovators Grant",
//     deadline: "2025-04-15",
//     amount: 5000.0,
//     description:
//       "For students pursuing degrees in technology and innovation fields. Applicants must showcase creativity in problem-solving and innovation. Open to all ethnicities and states. Preference given to Computer Science, Engineering, and Data Science students. Freshmen, Sophomores, and Juniors are encouraged to apply.",
//     requirements: ["No Essays"],
//   },
//   {
//     scholarship_id: "SCH002",
//     name: "Future Leaders Scholarship",
//     deadline: "2025-06-30",
//     amount: 10000.0,
//     description:
//       "Awarded to students demonstrating outstanding leadership potential. Applicants must showcase leadership in school, community, or extracurricular activities. Open to all majors and all U.S. states. Preference is given to students from minority backgrounds. Juniors and Seniors are highly encouraged to apply.",
//     requirements: ["No Recommendations Required"],
//   },
//   {
//     scholarship_id: "SCH003",
//     name: "Women in STEM Award",
//     deadline: "2025-05-10",
//     amount: 7500.0,
//     description:
//       "Scholarship for female students in science, technology, engineering, or mathematics. It aims to support and encourage women entering STEM fields. Applicants must demonstrate academic excellence and commitment to their field. Open to all ethnicities and U.S. states. Freshmen and Sophomores are highly encouraged to apply.",
//     requirements: ["No Transcripts Required"],
//   },
//   {
//     scholarship_id: "SCH004",
//     name: "Hispanic Heritage Achievement Scholarship",
//     deadline: "2025-07-15",
//     amount: 5000.0,
//     description:
//       "Awarded to students of Hispanic heritage who demonstrate academic excellence. This scholarship supports students pursuing any field of study. Applicants must showcase leadership, community involvement, and a commitment to cultural heritage. Open to all U.S. states. All year levels are welcome to apply.",
//     requirements: ["No min. GPA Required"],
//   },
//   {
//     scholarship_id: "SCH005",
//     name: "Native American Education Fund",
//     deadline: "2025-08-20",
//     amount: 6000.0,
//     description:
//       "This scholarship supports Native American students who seek higher education. Applicants must be affiliated with a recognized tribe and demonstrate academic commitment. Open to all majors and U.S. states. Preference is given to students studying History, Social Sciences, or Environmental Studies. All year levels can apply.",
//     requirements: ["No Essays", "No min. GPA Required"],
//   },
//   {
//     scholarship_id: "SCH006",
//     name: "African American Future Leaders Award",
//     deadline: "2025-09-10",
//     amount: 7500.0,
//     description:
//       "Designed for African American students who show promise in leadership and academics. Applicants must submit an essay detailing their career aspirations and community contributions. Open to all majors and U.S. states. Preference is given to students involved in social justice or advocacy work. Sophomores, Juniors, and Seniors are encouraged to apply.",
//     requirements: ["No Transcripts Required"],
//   },
//   {
//     scholarship_id: "SCH007",
//     name: "LGBTQ+ Equality Scholarship",
//     deadline: "2025-09-30",
//     amount: 7000.0,
//     description:
//       "Supports LGBTQ+ students who advocate for equality and inclusivity. Applicants must demonstrate involvement in LGBTQ+ community work or activism. Open to all ethnicities and U.S. states. Preference is given to students pursuing Sociology, Political Science, or Gender Studies. Freshmen and Juniors are encouraged to apply.",
//     requirements: ["No Essays"],
//   },
//   {
//     scholarship_id: "SCH008",
//     name: "Engineering Excellence Grant",
//     deadline: "2025-10-01",
//     amount: 9000.0,
//     description:
//       "Awarded to students who excel in engineering disciplines. Applicants must provide a project proposal or research idea in their engineering field. Open to all U.S. states and ethnicities. Juniors and Seniors majoring in Mechanical, Civil, or Electrical Engineering are preferred. Female applicants are highly encouraged.",
//     requirements: ["No Essays", "No Transcripts Required"],
//   },
//   {
//     scholarship_id: "SCH009",
//     name: "Veterans Scholarship Fund",
//     deadline: "2025-11-15",
//     amount: 8000.0,
//     description:
//       "Available to students who have served in the military or are dependents of veterans. Applicants must demonstrate financial need and academic dedication. Open to all U.S. states, majors, and ethnicities. Preference is given to students in healthcare, business, or engineering fields. All year levels can apply.",
//     requirements: ["No Recommendations Required"],
//   },
//   {
//     scholarship_id: "SCH010",
//     name: "Medical Studies Achievement Scholarship",
//     deadline: "2025-12-01",
//     amount: 10000.0,
//     description:
//       "For students pursuing careers in healthcare and medical fields. Applicants must demonstrate dedication to medicine through academic excellence and community service. Open to all ethnicities and U.S. states. Preference is given to students in Nursing, Pre-Med, or Biomedical Sciences. Juniors and Seniors are highly encouraged to apply.",
//     requirements: ["No min. GPA Required"],
//   }
// ]

// // Award Amount range arrays
// const awardAmounts = [
//   "$0-$1,000",
//   "$1,001 - $2,500",
//   "$2,501 - $5,000",
//   "$5,001 - $10,000",
//   "More than $10,000",
// ]

// // Requirements filter
// const requirementOptions = [
//   "No Essays",
//   "No Recommendations Required",
//   "No Transcripts Required",
//   "No min. GPA Required",
// ]

// const Welcome = () => {
//   const navigate = useNavigate()
//   const user = useUser()

//   const handleLogout = async () => {
//     await signOut(auth)
//     navigate("/login")
//   }

//   // State for the "Requirements" side filter
//   const [selectedRequirements, setSelectedRequirements] = useState([])

//   // State for "Award Amount" (buttons in place of popular categories)
//   const [selectedAwardAmounts, setSelectedAwardAmounts] = useState([])

//   // Sort
//   const [sortOrder, setSortOrder] = useState("Sort By")

//   // Expand/collapse descriptions
//   const [expandedCards, setExpandedCards] = useState({})
//   const toggleExpanded = (id) => {
//     setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }))
//   }

//   // Toggle logic for Requirements
//   const handleRequirementChange = (requirement) => {
//     setSelectedRequirements((prev) =>
//       prev.includes(requirement)
//         ? prev.filter((item) => item !== requirement)
//         : [...prev, requirement]
//     )
//   }

//   // Toggle logic for Award Amount (replacing the old 'categories' approach)
//   const handleAwardAmountClick = (amount) => {
//     setSelectedAwardAmounts((prev) =>
//       prev.includes(amount)
//         ? prev.filter((item) => item !== amount)
//         : [...prev, amount]
//     )
//   }

//   // Filter & Sort
//   const filterScholarships = () => {
//     return scholarships.filter((sch) => {
//       // Requirements: All selected must be in the scholarship's requirements
//       if (selectedRequirements.length > 0) {
//         // If a scholarship doesn't have *every* selected requirement, filter out
//         const hasAllReqs = selectedRequirements.every((req) =>
//           sch.requirements.includes(req)
//         )
//         if (!hasAllReqs) {
//           return false
//         }
//       }

//       // Award Amount: must match at least one of the selected ranges
//       if (selectedAwardAmounts.length > 0) {
//         const matchesAnyRange = selectedAwardAmounts.some((rangeString) => {
//           switch (rangeString) {
//             case "$0-$1,000":
//               return sch.amount >= 0 && sch.amount <= 1000
//             case "$1,001 - $2,500":
//               return sch.amount >= 1001 && sch.amount <= 2500
//             case "$2,501 - $5,000":
//               return sch.amount >= 2501 && sch.amount <= 5000
//             case "$5,001 - $10,000":
//               return sch.amount >= 5001 && sch.amount <= 10000
//             case "More than $10,000":
//               return sch.amount > 10000
//             default:
//               return true
//           }
//         })
//         if (!matchesAnyRange) {
//           return false
//         }
//       }

//       return true
//     })
//   }

//   const getSortedScholarships = () => {
//     let filtered = filterScholarships()
//     if (sortOrder === "Amount: High to Low") {
//       filtered.sort((a, b) => b.amount - a.amount)
//     } else if (sortOrder === "Amount: Low to High") {
//       filtered.sort((a, b) => a.amount - b.amount)
//     } else if (sortOrder === "Deadline: Soonest") {
//       filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
//     }
//     return filtered
//   }

//   // Featured scholarships: top 3 by amount
//   const featuredScholarships = [...scholarships]
//     .sort((a, b) => b.amount - a.amount)
//     .slice(0, 3)

//   const finalScholarships = getSortedScholarships()

//   if (user.isLoading) {
//     return <div>Loading...</div>
//   }

//   return (
//     <div className="app">
//       <nav className="navbar">
//         <div className="navbar-content">
//           <div className="logo">iScholar</div>
//           <div className="navbar-right">
//             <div className="user-greeting">
//               Welcome back, <span>{user.name}</span>
//             </div>
//             <button onClick={handleLogout} className="navbar-button">
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>

//       <main className="main-content">
//         {/* Featured Scholarships */}
//         <section className="featured-section">
//           <h1>Featured Scholarships</h1>
//           <div className="featured-grid">
//             {featuredScholarships.map((sch) => (
//               <div key={sch.scholarship_id} className="featured-card">
//                 <div className="premier-tag">Premier</div>
//                 <h3>{sch.name}</h3>
//                 <p className="no-essay">No essay</p>
//                 <div className="amount">${sch.amount.toLocaleString()}</div>
//                 <button className="apply-button">
//                   Apply Now <span>→</span>
//                 </button>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Scholarship Search */}
//         <section className="search-section">
//           <h2>Find the right scholarships for you</h2>

//           {/* Award Amount Section (replaces popular categories) */}
//           <div className="categories">
//             <h3>Award Amount</h3>
//             <div className="category-buttons">
//               {awardAmounts.map((amount) => (
//                 <button
//                   key={amount}
//                   onClick={() => handleAwardAmountClick(amount)}
//                   className={`category-button ${
//                     selectedAwardAmounts.includes(amount) ? "selected" : ""
//                   }`}
//                 >
//                   {amount}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Scholarship List */}
//           <div className="scholarship-container">
//             {/* Filters (only Requirements left) */}
//             <div className="filters">
//               <h3>Filter</h3>

//               {/* Requirements */}
//               <div className="filter-group">
//                 <strong>Requirements</strong>
//                 {requirementOptions.map((req) => (
//                   <div key={req} className="checkbox-item">
//                     <label>
//                       <input
//                         type="checkbox"
//                         checked={selectedRequirements.includes(req)}
//                         onChange={() => handleRequirementChange(req)}
//                       />
//                       {req}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Results */}
//             <div className="results">
//               <div className="results-header">
//                 <div className="results-count">
//                   Results · {finalScholarships.length}
//                 </div>
//                 <select
//                   className="sort-select"
//                   value={sortOrder}
//                   onChange={(e) => setSortOrder(e.target.value)}
//                 >
//                   <option>Sort By</option>
//                   <option>Amount: High to Low</option>
//                   <option>Amount: Low to High</option>
//                   <option>Deadline: Soonest</option>
//                 </select>
//               </div>

//               <div className="scholarship-list">
//                 {finalScholarships.map((scholarship) => (
//                   <div key={scholarship.scholarship_id} className="scholarship-card">
//                     <div className="scholarship-content">
//                       <div className="scholarship-info">
//                         <h3>{scholarship.name}</h3>
//                         <div className="deadline">
//                           Due: {new Date(scholarship.deadline).toLocaleDateString()}
//                         </div>
//                         <p>
//                           {expandedCards[scholarship.scholarship_id]
//                             ? scholarship.description
//                             : scholarship.description.slice(0, 100) +
//                               (scholarship.description.length > 100 ? "..." : "")}
//                         </p>
//                         {scholarship.description.length > 100 && (
//                           <button
//                             onClick={() => toggleExpanded(scholarship.scholarship_id)}
//                             style={{ marginTop: "0.5rem" }}
//                           >
//                             {expandedCards[scholarship.scholarship_id] ? "See Less" : "See More"}
//                           </button>
//                         )}
//                       </div>
//                       <div className="scholarship-action">
//                         <div className="amount">${scholarship.amount.toLocaleString()}</div>
//                         <button className="apply-button">Apply now</button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   )
// }

// export default Welcome
