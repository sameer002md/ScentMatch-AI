import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addPerfume } from "../services/api";

import "../styles/AddPerfume.css";


export default function AddPerfume() {

  const navigate = useNavigate();


  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({

    name: "",
    brand: "",
    gender: "",
    price: "",

    fragranceFamily: "",

    topNotes: "",
    middleNotes: "",
    baseNotes: "",

    occasion: "",
    season: "",

    longevity: "",
    sillage: "",

    description: ""

  });


  // ==========================================
  // IMAGE FILE
  // ==========================================

  const [imageFile, setImageFile] =
    useState(null);


  // ==========================================
  // LOADING
  // ==========================================

  const [loading, setLoading] =
    useState(false);


  // ==========================================
  // SUCCESS MESSAGE
  // ==========================================

  const [successMessage, setSuccessMessage] =
    useState("");


  // ==========================================
  // ERROR MESSAGE
  // ==========================================

  const [errorMessage, setErrorMessage] =
    useState("");


  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;


    setFormData(

      (previousData) => ({

        ...previousData,

        [name]: value

      })

    );

  };


  // ==========================================
  // HANDLE IMAGE CHANGE
  // ==========================================

  const handleImageChange = (e) => {

    const selectedFile =
      e.target.files[0];


    if (selectedFile) {

      setImageFile(
        selectedFile
      );

    }

  };


  // ==========================================
  // HANDLE SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    // ========================================
    // CLEAR OLD MESSAGES
    // ========================================

    setSuccessMessage("");

    setErrorMessage("");


    // ========================================
    // BASIC VALIDATION
    // ========================================

    if (

      !formData.name.trim() ||

      !formData.brand.trim() ||

      !formData.gender ||

      !formData.price

    ) {

      setErrorMessage(

        "Please fill in all required fields."

      );

      return;

    }


    try {

      setLoading(true);


      // ======================================
      // CREATE FORM DATA
      // ======================================

      const perfumeData =
        new FormData();


      // ======================================
      // BASIC INFORMATION
      // ======================================

      perfumeData.append(

        "name",

        formData.name.trim()

      );


      perfumeData.append(

        "brand",

        formData.brand.trim()

      );


      perfumeData.append(

        "gender",

        formData.gender

      );


      perfumeData.append(

        "price",

        Number(formData.price)

      );


      // ======================================
      // FRAGRANCE INFORMATION
      // ======================================

      perfumeData.append(

        "fragranceFamily",

        formData
          .fragranceFamily
          .trim()

      );


      perfumeData.append(

        "topNotes",

        formData
          .topNotes
          .trim()

      );


      perfumeData.append(

        "middleNotes",

        formData
          .middleNotes
          .trim()

      );


      perfumeData.append(

        "baseNotes",

        formData
          .baseNotes
          .trim()

      );


      // ======================================
      // USAGE INFORMATION
      // ======================================

      perfumeData.append(

        "occasion",

        formData
          .occasion
          .trim()

      );


      perfumeData.append(

        "season",

        formData
          .season
          .trim()

      );


      perfumeData.append(

        "longevity",

        formData
          .longevity
          .trim()

      );


      perfumeData.append(

        "sillage",

        formData
          .sillage
          .trim()

      );


      // ======================================
      // DESCRIPTION
      // ======================================

      perfumeData.append(

        "description",

        formData
          .description
          .trim()

      );


      // ======================================
      // IMAGE FILE
      // ======================================

      if (imageFile) {

        perfumeData.append(

          "image",

          imageFile

        );

      }


      // ======================================
      // API CALL
      // ======================================

      await addPerfume(
        perfumeData
      );


      // ======================================
      // SUCCESS
      // ======================================

      setSuccessMessage(

        "Perfume added successfully!"

      );


      // ======================================
      // RESET FORM
      // ======================================

      setFormData({

        name: "",
        brand: "",
        gender: "",
        price: "",

        fragranceFamily: "",

        topNotes: "",
        middleNotes: "",
        baseNotes: "",

        occasion: "",
        season: "",

        longevity: "",
        sillage: "",

        description: ""

      });


      // ======================================
      // RESET IMAGE
      // ======================================

      setImageFile(
        null
      );


      // ======================================
      // OPTIONAL REDIRECT
      // ======================================

      setTimeout(

        () => {

          navigate(
            "/admin"
          );

        },

        1500

      );


    } catch (error) {

      console.error(

        "Error adding perfume:",

        error

      );


      setErrorMessage(

        error?.response?.data?.message ||

        "Unable to add perfume. Please try again."

      );


    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // CANCEL
  // ==========================================

  const handleCancel = () => {

    navigate(
      "/admin"
    );

  };


  // ==========================================
  // MAIN UI
  // ==========================================

  return (

    <div
      className="add-perfume-page"
    >


      {/* =====================================
          NAVBAR
      ===================================== */}

      <header
        className="add-perfume-header"
      >


        <div
          className="add-brand"

          onClick={() =>
            navigate("/admin")
          }
        >


          <div
            className="brand-icon"
          >

            ✦

          </div>


          <div>

            <h2>
              ScentMatch
            </h2>


            <p>
              ADMIN CONTROL CENTER
            </p>

          </div>


        </div>



        <button

          className="back-admin-btn"

          onClick={() =>
            navigate("/admin")
          }

        >

          ← Back to Admin

        </button>


      </header>



      {/* =====================================
          MAIN
      ===================================== */}

      <main
        className="add-perfume-main"
      >


        {/* ===================================
            TITLE
        =================================== */}

        <section
          className="add-perfume-title"
        >


          <p>
            PERFUME MANAGEMENT
          </p>


          <h1>

            Add a new

            {" "}

            <span>
              perfume.
            </span>

          </h1>


          <h3>

            Add fragrance details to your
            ScentMatch collection.

          </h3>


        </section>



        {/* ===================================
            FORM
        =================================== */}

        <form

          className="perfume-form"

          onSubmit={
            handleSubmit
          }

        >


          {/* =================================
              BASIC INFORMATION
          ================================= */}

          <section
            className="form-section"
          >


            <h2>
              Basic Information
            </h2>


            <div
              className="form-grid"
            >


              {/* PERFUME NAME */}

              <div
                className="form-group"
              >

                <label>
                  Perfume Name *
                </label>


                <input

                  type="text"

                  name="name"

                  value={
                    formData.name
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Enter perfume name"

                  required

                />

              </div>



              {/* BRAND */}

              <div
                className="form-group"
              >

                <label>
                  Brand *
                </label>


                <input

                  type="text"

                  name="brand"

                  value={
                    formData.brand
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Enter brand name"

                  required

                />

              </div>



              {/* GENDER */}

              <div
                className="form-group"
              >

                <label>
                  Gender *
                </label>


                <select

                  name="gender"

                  value={
                    formData.gender
                  }

                  onChange={
                    handleChange
                  }

                  required

                >

                  <option value="">
                    Select Gender
                  </option>


                  <option value="Men">
                    Men
                  </option>


                  <option value="Women">
                    Women
                  </option>


                  <option value="Unisex">
                    Unisex
                  </option>

                </select>

              </div>



              {/* PRICE */}

              <div
                className="form-group"
              >

                <label>
                  Price (₹) *
                </label>


                <input

                  type="number"

                  name="price"

                  value={
                    formData.price
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Enter price"

                  min="0"

                  required

                />

              </div>


            </div>


          </section>



          {/* =================================
              FRAGRANCE DETAILS
          ================================= */}

          <section
            className="form-section"
          >


            <h2>
              Fragrance Details
            </h2>


            <div
              className="form-grid"
            >


              {/* FRAGRANCE FAMILY */}

              <div
                className="form-group wide"
              >

                <label>
                  Fragrance Family
                </label>


                <input

                  type="text"

                  name="fragranceFamily"

                  value={
                    formData
                      .fragranceFamily
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Example: Woody, Floral, Fresh"

                />

              </div>



              {/* TOP NOTES */}

              <div
                className="form-group"
              >

                <label>
                  Top Notes
                </label>


                <input

                  type="text"

                  name="topNotes"

                  value={
                    formData.topNotes
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Example: Bergamot, Lemon"

                />

              </div>



              {/* MIDDLE NOTES */}

              <div
                className="form-group"
              >

                <label>
                  Middle Notes
                </label>


                <input

                  type="text"

                  name="middleNotes"

                  value={
                    formData.middleNotes
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Example: Jasmine, Rose"

                />

              </div>



              {/* BASE NOTES */}

              <div
                className="form-group wide"
              >

                <label>
                  Base Notes
                </label>


                <input

                  type="text"

                  name="baseNotes"

                  value={
                    formData.baseNotes
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Example: Musk, Vanilla, Sandalwood"

                />

              </div>


            </div>


          </section>



          {/* =================================
              PERFUME IMAGE
          ================================= */}

          <section
            className="form-section"
          >


            <h2>
              Perfume Image
            </h2>


            <div
              className="form-grid"
            >


              {/* IMAGE BROWSER */}

              <div
                className="form-group full-width"
              >


                <label>
                  Choose Perfume Image
                </label>


                <input

                  type="file"

                  accept="image/*"

                  onChange={
                    handleImageChange
                  }

                />


                {/* SELECTED IMAGE NAME */}

                {imageFile && (

                  <p
                    style={{

                      marginTop: "10px",

                      color: "#77716a",

                      fontSize: "13px"

                    }}
                  >

                    Selected Image:

                    {" "}

                    {imageFile.name}

                  </p>

                )}


              </div>


            </div>


          </section>



          {/* =================================
              PERFORMANCE DETAILS
          ================================= */}

          <section
            className="form-section"
          >


            <h2>
              Performance Details
            </h2>


            <div
              className="form-grid"
            >


              {/* OCCASION */}

              <div
                className="form-group"
              >

                <label>
                  Occasion
                </label>


                <input

                  type="text"

                  name="occasion"

                  value={
                    formData.occasion
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Example: Casual, Party"

                />

              </div>



              {/* SEASON */}

              <div
                className="form-group"
              >

                <label>
                  Season
                </label>


                <input

                  type="text"

                  name="season"

                  value={
                    formData.season
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Example: Summer, Winter"

                />

              </div>



              {/* LONGEVITY */}

              <div
                className="form-group"
              >

                <label>
                  Longevity
                </label>


                <input

                  type="text"

                  name="longevity"

                  value={
                    formData.longevity
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Example: 6-8 hours"

                />

              </div>



              {/* SILLAGE */}

              <div
                className="form-group"
              >

                <label>
                  Sillage
                </label>


                <input

                  type="text"

                  name="sillage"

                  value={
                    formData.sillage
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Example: Moderate"

                />

              </div>


            </div>


          </section>



          {/* =================================
              DESCRIPTION
          ================================= */}

          <section
            className="form-section"
          >


            <h2>
              Description
            </h2>


            <div
              className="form-grid"
            >


              <div
                className="form-group full-width"
              >

                <label>
                  Perfume Description
                </label>


                <textarea

                  name="description"

                  value={
                    formData.description
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Write a short description about the perfume..."

                />

              </div>


            </div>


          </section>



          {/* =================================
              SUCCESS MESSAGE
          ================================= */}

          {successMessage && (

            <div
              className="success-message"
            >

              {successMessage}

            </div>

          )}



          {/* =================================
              ERROR MESSAGE
          ================================= */}

          {errorMessage && (

            <div
              className="error-message"
            >

              {errorMessage}

            </div>

          )}



          {/* =================================
              BUTTONS
          ================================= */}

          <div
            className="form-actions"
          >


            <button

              type="button"

              className="cancel-btn"

              onClick={
                handleCancel
              }

              disabled={
                loading
              }

            >

              Cancel

            </button>



            <button

              type="submit"

              className="submit-perfume-btn"

              disabled={
                loading
              }

            >

              {loading

                ? "Adding Perfume..."

                : "Add Perfume"

              }

            </button>


          </div>


        </form>


      </main>


    </div>

  );

}