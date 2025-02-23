import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import '../ProfileForm.css';

const ProfileForm = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    origin_country: '',
    current_living_country: '',
    current_living_state: '',
    race: '',
    gpa: '',           // will be converted to float on submit
    gender: '',
    major: '',
    classification: '',
    disability: '',    // new field for disability question (boolean)
    lgbtqa: '',        // new field for LGBTQA+ community (boolean)
    need_based_aid: '',  // radio value to be stored as boolean
    merit_based_aid: '', // radio value to be stored as boolean
    international: '',   // radio value to be stored as boolean
    us_citizen: '',      // radio value to be stored as boolean
    hbcu: '',            // radio value to be stored as boolean
  });
  const [submitting, setSubmitting] = useState(false);
  
  // Local state for resume file (uploaded but not used)
  const [resumeFile, setResumeFile] = useState(null);

  // On mount, check if profile already exists for the current user
  useEffect(() => {
    const checkProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const docSnap = await getDoc(doc(db, 'userProfiles', user.uid));
        if (docSnap.exists()) {
          navigate('/welcome');
        }
      }
    };
    checkProfile();
  }, [navigate]);

  // Handle change with type conversion for GPA and boolean fields
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'gpa') {
      value = parseFloat(value);
    }
    const booleanFields = ['need_based_aid', 'merit_based_aid', 'international', 'us_citizen', 'hbcu', 'disability', 'lgbtqa'];
    if (booleanFields.includes(name)) {
      value = e.target.value === 'true';
    }
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Resume file upload handler (does nothing beyond storing the file locally)
  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not logged in');

      // Save the profile info in Firestore under "userProfiles" with snake_case keys
      await setDoc(doc(db, 'userProfiles', user.uid), {
        ...profileData,
        uid: user.uid,
      });
      setSubmitting(false);
      navigate('/welcome');
    } catch (error) {
      console.error('Error during profile submission:', error);
      setSubmitting(false);
      alert('Error: ' + error.message);
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
              name="origin_country"
              value={profileData.origin_country}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Current Living Country
            <input
              type="text"
              name="current_living_country"
              value={profileData.current_living_country}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Current Living State
            <input
              type="text"
              name="current_living_state"
              value={profileData.current_living_state}
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
              type="number"
              step="0.01"
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
            Classification
            <input
              type="text"
              name="classification"
              value={profileData.classification}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Do you have a disability?
            <div className="radio-group">
              <label>
                <input type="radio" name="disability" value="true" onChange={handleChange} required />
                Yes
              </label>
              <label>
                <input type="radio" name="disability" value="false" onChange={handleChange} />
                No
              </label>
            </div>
          </label>

          <label>
            Do you belong to the LGBTQA+ community?
            <div className="radio-group">
              <label>
                <input type="radio" name="lgbtqa" value="true" onChange={handleChange} required />
                Yes
              </label>
              <label>
                <input type="radio" name="lgbtqa" value="false" onChange={handleChange} />
                No
              </label>
            </div>
          </label>

          <label>
            Do you require Need Based Aid?
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="need_based_aid"
                  value="true"
                  onChange={handleChange}
                  required
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="need_based_aid"
                  value="false"
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </label>

          <label>
            Do you require Merit Based Aid?
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="merit_based_aid"
                  value="true"
                  onChange={handleChange}
                  required
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="merit_based_aid"
                  value="false"
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </label>

          <label>
            Are you an International student?
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="international"
                  value="true"
                  onChange={handleChange}
                  required
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="international"
                  value="false"
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </label>

          <label>
            Are you a US Citizen?
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="us_citizen"
                  value="true"
                  onChange={handleChange}
                  required
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="us_citizen"
                  value="false"
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </label>

          <label>
            Do you go to HBCU/HSI?
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="hbcu"
                  value="true"
                  onChange={handleChange}
                  required
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="hbcu"
                  value="false"
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </label>

          <label>
            Upload Resume (PDF, DOC, or DOCX)
            <input
              type="file"
              name="resumeFile"
              accept=".pdf, .doc, .docx"
              onChange={handleFileChange}
            />
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
