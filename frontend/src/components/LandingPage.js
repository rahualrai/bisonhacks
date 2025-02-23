import React from "react"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Clock, Search } from "lucide-react"

/**
 * Framer Motion variant generator
 */
const getTitleAnimation = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
})

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#faf7f2" }}>
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "1.125rem", fontWeight: 500 }}>
            iScholar
          </span>
        </div>

        <a
          href="/login"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            borderRadius: "9999px",
            backgroundColor: "black",
            padding: "8px 24px",
            color: "white",
            textDecoration: "none",
          }}
        >
          Login
          <ArrowRight size={16} />
        </a>
      </nav>

      {/* Header */}
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        {/* <motion.a
          href="/download"
          {...getTitleAnimation(0.2)}
          style={{
            marginBottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            borderRadius: "9999px",
            border: "2px solid black",
            backgroundColor: "black",
            color: "white",
            padding: "4px 16px",
            fontSize: "0.875rem",
            textDecoration: "none",
          }}
        >
          Beta is now available!
          <ArrowRight size={16} />
        </motion.a> */}

        <div style={{ marginBottom: "80px", maxWidth: "960px" }}>
          <h1
            style={{ fontFamily: "serif", fontSize: "3rem", lineHeight: 1.2 }}
          >
            <motion.span {...getTitleAnimation(0.3)}>discover your</motion.span>
            <br />
            <motion.span {...getTitleAnimation(0.4)}>perfect </motion.span>
            <motion.span
              {...getTitleAnimation(0.5)}
              style={{ color: "#ff6b6b", fontStyle: "italic" }}
            >
              scholarship
            </motion.span>
            <motion.span {...getTitleAnimation(0.6)}> with AI</motion.span>
          </h1>

          <motion.p
            {...getTitleAnimation(0.7)}
            style={{
              marginTop: "24px",
              fontSize: "1.125rem",
              color: "#4B5563",
            }}
          >
            Let AI find and match you with scholarships tailored to your
            profile.
            <br />
            Smart recommendations, simplified applications, higher success rate.
          </motion.p>

          <motion.div
            {...getTitleAnimation(0.8)}
            style={{
              marginTop: "40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <a
              href="/login"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                borderRadius: "9999px",
                backgroundColor: "black",
                color: "white",
                padding: "12px 32px",
                textDecoration: "none",
                maxWidth: "fit-content",
              }}
            >
              Start Your Search
              <ArrowRight size={16} />
            </a>
            <a
              href="#how-it-works"
              style={{
                borderRadius: "9999px",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                padding: "12px 32px",
                textDecoration: "none",
                color: "black",
                maxWidth: "fit-content",
              }}
            >
              How It Works
            </a>
          </motion.div>
        </div>
      </header>

      <motion.div
        {...getTitleAnimation(0.9)}
        style={{
          margin: "0 auto 96px auto",
          maxWidth: "960px",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            overflow: "hidden",
            borderRadius: "8px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          }}
        >
          {/* Add your image or content here, if needed */}
        </div>
      </motion.div>

      {/* Bento Grid */}
      <div style={{ padding: "0 24px", marginBottom: "96px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(2, 200px)",
            gap: "24px",
          }}
        >
          {/* Large Image 1 */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            style={{
              gridColumn: "span 2",
              gridRow: "span 2",
              borderRadius: "24px",
              overflow: "hidden",
              position: "relative",
              backgroundColor: "#e8f1ff",
              boxShadow: "0 10px 30px -5px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
          >
            <motion.div
              initial={{ filter: "blur(20px)", opacity: 0 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.6, 0.05, 0.01, 0.9] }}
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80"
                alt="Students using AI scholarship tracker"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                loading="lazy"
              />
            </motion.div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "20px",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                color: "white",
              }}
            >
              <h3 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>
                AI-Powered Scholarship Finder
              </h3>
              <p style={{ fontSize: "0.875rem", opacity: 0.9 }}>
                Find and track scholarships tailored to you
              </p>
            </div>
          </motion.div>

          {/* Small Image 1 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            style={{
              gridColumn: "span 1",
              borderRadius: "24px",
              overflow: "hidden",
              position: "relative",
              backgroundColor: "#e8f1ff",
              boxShadow: "0 10px 30px -5px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
          >
            <motion.div
              initial={{ filter: "blur(20px)", opacity: 0 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.6, 0.05, 0.01, 0.9] }}
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&auto=format&fit=crop&q=80"
                alt="Student tracking deadlines"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                loading="lazy"
              />
            </motion.div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "20px",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                color: "white",
              }}
            >
              <h3 style={{ fontSize: "1rem" }}>Smart Deadline Tracking</h3>
            </div>
          </motion.div>

          {/* Small Image 2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            style={{
              gridColumn: "span 1",
              borderRadius: "24px",
              overflow: "hidden",
              position: "relative",
              backgroundColor: "#e8f1ff",
              boxShadow: "0 10px 30px -5px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
          >
            <motion.div
              initial={{ filter: "blur(20px)", opacity: 0 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.6, 0.05, 0.01, 0.9] }}
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&auto=format&fit=crop&q=80"
                alt="Student checking application status"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                loading="lazy"
              />
            </motion.div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "20px",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                color: "white",
              }}
            >
              <h3 style={{ fontSize: "1rem" }}>Application Status</h3>
            </div>
          </motion.div>

          {/* Medium Image 1 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            style={{
              gridColumn: "span 2",
              borderRadius: "24px",
              overflow: "hidden",
              position: "relative",
              backgroundColor: "#e8f1ff",
              boxShadow: "0 10px 30px -5px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
          >
            <motion.div
              initial={{ filter: "blur(20px)", opacity: 0 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.6, 0.05, 0.01, 0.9] }}
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80"
                alt="Students collaborating on applications"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                loading="lazy"
              />
            </motion.div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "20px",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                color: "white",
              }}
            >
              <h3 style={{ fontSize: "1.125rem" }}>AI Application Assistant</h3>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* AI-Powered Matching Section */}
      <section style={{ padding: "96px 24px", textAlign: "center" }}>
        <h2
          style={{
            marginBottom: "24px",
            fontFamily: "serif",
            fontSize: "2.5rem",
          }}
        >
          AI-Powered Matching
        </h2>
        <p
          style={{
            margin: "0 auto",
            maxWidth: "768px",
            fontSize: "1.125rem",
            color: "#4B5563",
          }}
        >
          Our advanced AI analyzes thousands of scholarships to find the perfect
          matches for you. Get personalized recommendations based on your
          academic profile, interests, and achievements.
        </p>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "32px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg
                viewBox="0 0 24 24"
                style={{ height: "20px", width: "20px", color: "green" }}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Smart scholarship matching</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg
                viewBox="0 0 24 24"
                style={{ height: "20px", width: "20px", color: "green" }}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>24/7 application support</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" style={{ padding: "96px 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          style={{ margin: "0 auto", maxWidth: "768px", textAlign: "center" }}
        >
          <h2
            style={{
              marginBottom: "64px",
              fontFamily: "serif",
              fontSize: "2rem",
            }}
          >
            How It Works
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "64px",
            }}
          >
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  marginBottom: "24px",
                  display: "flex",
                  height: "64px",
                  width: "64px",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "9999px",
                  backgroundColor: "#e8f1ff",
                }}
              >
                <Search size={32} color="#ff6b6b" />
              </div>
              <h3 style={{ marginBottom: "8px", fontSize: "1.25rem" }}>
                Enter Your Details
              </h3>
              <p style={{ color: "#4B5563" }}>
                Tell us about your academic background and interests
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  marginBottom: "24px",
                  display: "flex",
                  height: "64px",
                  width: "64px",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "9999px",
                  backgroundColor: "#e8f1ff",
                }}
              >
                <BookOpen size={32} color="#ff6b6b" />
              </div>
              <h3 style={{ marginBottom: "8px", fontSize: "1.25rem" }}>
                Get AI Assistance
              </h3>
              <p style={{ color: "#4B5563" }}>
                Receive personalized essay help and application tips
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  marginBottom: "24px",
                  display: "flex",
                  height: "64px",
                  width: "64px",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "9999px",
                  backgroundColor: "#e8f1ff",
                }}
              >
                <Clock size={32} color="#ff6b6b" />
              </div>
              <h3 style={{ marginBottom: "8px", fontSize: "1.25rem" }}>
                Track Progress
              </h3>
              <p style={{ color: "#4B5563" }}>
                Stay on top of deadlines and application status
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
