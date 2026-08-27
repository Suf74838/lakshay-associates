/* ==========================================================================
   LAKSHAY - SITE CONFIGURATION
   Everything you are likely to change is in this one file.
   Edit the values below, save, upload. No other file needs to be touched.
   ========================================================================== */

var LAKSHAY = {

  /* ---- WHATSAPP --------------------------------------------------------
     Confirmed WhatsApp number: +91 87557 98121
     Format: country code + number, digits only, no +, no spaces.
     Replace here if the WhatsApp number ever changes.                     */
  WHATSAPP_NUMBER: "918755798121",

  WHATSAPP_MESSAGE: "Hello Lakshay Associates & Consultants, I would like to know more about ISO certification services.",

  /* ---- CONTACT ---------------------------------------------------------
     Used for the tel: and mailto: links that JavaScript builds.
     The same details also appear as plain text in the HTML footer.        */
  PHONE_PRIMARY: "918755798121",
  PHONE_SECONDARY: "916367863594",
  EMAIL: "lakshayc78@gmail.com",

  /* ---- ENQUIRY FORM ----------------------------------------------------
     A GitHub Pages site cannot email you on its own, so there are two ways
     to receive enquiries.

     OPTION A (active by default): the form opens WhatsApp with the
     enquiry already typed out. Nothing to set up.

     OPTION B: create a free form endpoint at formspree.io (or similar),
     paste the URL below, and enquiries arrive by email instead.
     Example: "https://formspree.io/f/xxxxxxxx"                            */
  FORM_ENDPOINT: "",

  /* ---- HOMEPAGE COUNTERS ----------------------------------------------
     Client supplied figures. Update the numbers here at any time.
     The same numbers are also written into index.html data-count values,
     which is what the animation reads. See README-REPLACE.md.            */
  STATS: {
    years: 7,          // years of industry experience
    clients: 150,      // clients supported
    certifications: 200, // certifications assisted
    standards: 13      // ISO management standards supported
  },

  /* ---- INTRO ANIMATION -------------------------------------------------
     The opening sequence: logo appears centre screen, then travels up and
     settles into the header.
     Set SHOW_ONCE to true if you only want it on the first visit of a
     browsing session instead of on every page load.                       */
  INTRO_ENABLED: true,
  INTRO_SHOW_ONCE: false,

  /* ---- GOOGLE MAPS -----------------------------------------------------
     Leave empty until you have the exact map link for the office.
     Paste the Google Maps embed URL here and the map appears automatically
     on the contact page.
     Example: "https://www.google.com/maps/embed?pb=..."                    */
  MAP_EMBED_URL: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3486.1654087081624!2d77.27482987551814!3d29.10079767541233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjnCsDA2JzAyLjkiTiA3N8KwMTYnMzguNyJF!5e0!3m2!1sen!2sin!4v1787823829047!5m2!1sen!2sin"
};