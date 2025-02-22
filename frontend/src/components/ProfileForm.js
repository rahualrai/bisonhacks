// src/components/ProfileForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import '../ProfileForm.css';

const ProfileForm = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    originCountry: '',
    currentLivingCountry: '',
    currentLivingState: '',
    race: '',
    gpa: '',
    gender: '',
    major: '',
    grade: '',
    needMerit: '',
    international: '',
    usCitizen: '',
    hbcu: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not logged in');

      // Save the profile info in Firestore under "userProfiles"
      await setDoc(doc(db, 'userProfiles', user.uid), {
        ...profileData,
        uid: user.uid,
      });
      setSubmitting(false);
      navigate('/welcome');
    } catch (error) {
      console.error("Error during profile submission:", error);
      setSubmitting(false);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <h2>Complete Your Profile</h2>
        <form onSubmit={handleSubmit} className="profile-form">
          <label>
            Origin Country
            <input
              type="text"
              name="originCountry"
              value={profileData.originCountry}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Current Living Country
            <input
              type="text"
              name="currentLivingCountry"
              value={profileData.currentLivingCountry}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Current Living State
            <input
              type="text"
              name="currentLivingState"
              value={profileData.currentLivingState}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Race
            <input
              type="text"
              name="race"
              value={profileData.race}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            GPA
            <input
              type="text"
              name="gpa"
              value={profileData.gpa}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Gender
            <div className="radio-group">
              <label>
                <input type="radio" name="gender" value="Male" onChange={handleChange} required />
                Male
              </label>
              <label>
                <input type="radio" name="gender" value="Female" onChange={handleChange} />
                Female
              </label>
              <label>
                <input type="radio" name="gender" value="Other" onChange={handleChange} />
                Other
              </label>
            </div>
          </label>

          <label>
            Major
            <input
              type="text"
              name="major"
              value={profileData.major}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Grade
            <input
              type="text"
              name="grade"
              value={profileData.grade}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Need or Merit or Both
            <div className="radio-group">
              <label>
                <input type="radio" name="needMerit" value="Need" onChange={handleChange} required />
                Need
              </label>
              <label>
                <input type="radio" name="needMerit" value="Merit" onChange={handleChange} />
                Merit
              </label>
              <label>
                <input type="radio" name="needMerit" value="Both" onChange={handleChange} />
                Both
              </label>
            </div>
          </label>

          <label>
            International or not
            <div className="radio-group">
              <label>
                <input type="radio" name="international" value="Yes" onChange={handleChange} required />
                Yes
              </label>
              <label>
                <input type="radio" name="international" value="No" onChange={handleChange} />
                No
              </label>
            </div>
          </label>

          <label>
            US Citizen
            <div className="radio-group">
              <label>
                <input type="radio" name="usCitizen" value="Yes" onChange={handleChange} required />
                Yes
              </label>
              <label>
                <input type="radio" name="usCitizen" value="No" onChange={handleChange} />
                No
              </label>
            </div>
          </label>

          <label>
            HBCU/HSI
            <div className="radio-group">
              <label>
                <input type="radio" name="hbcu" value="Yes" onChange={handleChange} required />
                Yes
              </label>
              <label>
                <input type="radio" name="hbcu" value="No" onChange={handleChange} />
                No
              </label>
            </div>
          </label>

          <button type="submit" className="profile-button" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
