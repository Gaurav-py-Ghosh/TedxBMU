const certificateRecipients = [
  { serialNo: 1, name: "Akshat Kabra", email: "akshat.kabra.23bmi@bmu.edu.in", role: "Licensee", certificateFile: "Certificate for Licensee.png" },
  { serialNo: 2, name: "Rhea s sud", email: "rheasingh.sud.23bch@bmu.edu.in", role: "Licensee", certificateFile: "Certificate for Licensee (2).png" },
  { serialNo: 3, name: "Yakshita Yadav", email: "yakshita.yadav.23cse@bmu.edu.in", role: "Lead", certificateFile: "Certificate for Lead.png" },
  { serialNo: 4, name: "Radhika Goel", email: "radhika.goel.23cse@bmu.edu.in", role: "Lead", certificateFile: "Certificate for Lead (2).png" },
  { serialNo: 5, name: "Priyal Khullar", email: "priyal.khullar.23cse@bmu.edu.in", role: "Lead", certificateFile: "Certificate for Lead (3).png" },
  { serialNo: 6, name: "Aryan Nair", email: "aryan.nair.23bmi@bmu.edu.in", role: "Lead", certificateFile: "Certificate for Lead (4).png" },
  { serialNo: 7, name: "Bhavyanshi singh", email: "bhavyanshi.singh.23mec@bmu.edu.in", role: "Lead", certificateFile: "Certificate for Lead (5).png" },
  { serialNo: 8, name: "Sanyam Jain", email: "sanyam.jain.23cse@bmu.edu.in", role: "Lead", certificateFile: "Certificate for Lead (6).png" },
  { serialNo: 9, name: "Tanuj Dhakad", email: "tanuj.dhakad.23bch@bmu.edu.in", role: "Lead", certificateFile: "Certificate for Lead (7).png" },
  { serialNo: 10, name: "Saanvee Sharma", email: "saanvee.sharma.23cse@bmu.edu.in", role: "Lead", certificateFile: "Certificate for Lead (8).png" },
  { serialNo: 11, name: "Bayyapureddy Vibhugnan", email: "bayyapureddy.vibhugnan.23cse@bmu.edu.in", role: "Lead", certificateFile: "Certificate for Lead (9).png" },
  { serialNo: 12, name: "Ansh Gagneja", email: "ansh.gagneja.23bmi@bmu.edu.in", role: "Lead", certificateFile: "Certificate for Lead (10).png" },
  { serialNo: 13, name: "Dhiren", email: "dhiren.23cse@bmu.edu.in", role: "Lead", certificateFile: "Certificate for Lead (11).png" },
  { serialNo: 14, name: "Gaurav Ghosh", email: "gaurav.ghosh.23cse@bmu.edu.in", role: "Lead", certificateFile: "Certificate for Lead (12).png" },
  { serialNo: 15, name: "Annu", email: "annu.24cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC.png" },
  { serialNo: 16, name: "Ashish Agrawal", email: "ashish.agrawal.25cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (2).png" },
  { serialNo: 17, name: "Vaibhav jangra", email: "vaibhav.jangra.25cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (3).png" },
  { serialNo: 18, name: "Ajanta Tejaswini", email: "ajanta.tejaswini.24bbl@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (4).png" },
  { serialNo: 19, name: "Kartika Joshi", email: "kartika.joshi.24cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (5).png" },
  { serialNo: 20, name: "Vivek Chaudhary", email: "vivek.chaudhary.24cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (6).png" },
  { serialNo: 21, name: "Vaibhavi Mittal", email: "vaibhavi.mittal.25cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (7).png" },
  { serialNo: 22, name: "Rohini Sen", email: "rohini.sen.25bah@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (8).png" },
  { serialNo: 23, name: "Sanaa Ansari", email: "sanaa.ansari.25bah@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (9).png" },
  { serialNo: 24, name: "Mahir Yadav", email: "mahir.yadav.24cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (10).png" },
  { serialNo: 25, name: "Dev Gupta", email: "dev.gupta.25cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (11).png" },
  { serialNo: 26, name: "Sarvangi Upadhyay", email: "sarvangi.upadhyay.25cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (12).png" },
  { serialNo: 27, name: "Harnoor singh", email: "harnoor.singh.25cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (13).png" },
  { serialNo: 28, name: "Yash Tulsani", email: "yash.tulsani.24cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (14).png" },
  { serialNo: 29, name: "Shravani Bali", email: "shravani.bali.25bmi@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (15).png" },
  { serialNo: 30, name: "kratika Gupta", email: "kratika.gupta.25cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (16).png" },
  { serialNo: 31, name: "vismaya H Pradeep", email: "vismaya.pradeep.25ece@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (17).png" },
  { serialNo: 32, name: "Aaryaman Pratap Singh", email: "aaryamanpratap.singh.24cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (18).png" },
  { serialNo: 33, name: "Binayak Verma", email: "binayak.verma.25cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (19).png" },
  { serialNo: 34, name: "B R Kaustubh", email: "br.kaustubh.24bbl@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (20).png" },
  { serialNo: 35, name: "Avni Sharma", email: "avni.sharma.25cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (21).png" },
  { serialNo: 36, name: "Manan Goyal", email: "manan.goyal.25cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (22).png" },
  { serialNo: 37, name: "Harshita Tewani", email: "harshita.tewani.24cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (23).png" },
  { serialNo: 38, name: "Anirudh Siva T", email: "anirudhsiva.t.25cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (24).png" },
  { serialNo: 39, name: "Harsha", email: "mutyamharsha.anvitha.24cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (25).png" },
  { serialNo: 40, name: "Ridhi Banger", email: "ridhi.banger.25cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (26).png" },
  { serialNo: 41, name: "Purvi Aneja", email: "purvi.aneja.24cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (27).png" },
  { serialNo: 42, name: "Ishank Chauhan", email: "ishank.chauhan.25cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (28).png" },
  { serialNo: 43, name: "Sadhwi", email: "sadhwi.25bmi@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (29).png" },
  { serialNo: 44, name: "Narpender singh", email: "narpender.singh.25ece@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (30).png" },
  { serialNo: 45, name: "Farhan Akhtar", email: "farhan.akhter.24cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (31).png" },
  { serialNo: 46, name: "Krishna Shah", email: "krishna.shah.25cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (32).png" },
  { serialNo: 47, name: "Vivek Singh", email: "vivek.singh.24cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (33).png" },
  { serialNo: 48, name: "Mehul Vig", email: "mehul.vig.24cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (34).png" },
  { serialNo: 49, name: "Tejaswi Khandelwal", email: "tejaswi.khandelwal.24cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (35).png" },
  { serialNo: 50, name: "Aman Rastogi", email: "aman.rastogi.25cse@bmu.edu.in", role: "OC", certificateFile: "Certificate for OC (36).png" },
  { serialNo: 51, name: "Tarushi Garg", email: "", role: "OC", certificateFile: "Certificate for OC (37).png" },
  { serialNo: 52, name: "Maulik Gupta", email: "", role: "OC", certificateFile: "Certificate for OC (38).png" },
];

const normalizeEmail = (email) => (email || "").trim().toLowerCase();

const normalizeName = (name) =>
  (name || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

const findCertificateRecipient = ({ email, name }) => {
  const cleanEmail = normalizeEmail(email);
  const cleanName = normalizeName(name);

  if (cleanEmail) {
    const byEmail = certificateRecipients.find(
      (recipient) => recipient.email && normalizeEmail(recipient.email) === cleanEmail
    );

    if (byEmail) return { ...byEmail, matchType: "email" };
  }

  const byNameWithoutEmail = certificateRecipients.find(
    (recipient) => !recipient.email && normalizeName(recipient.name) === cleanName
  );

  if (byNameWithoutEmail) return { ...byNameWithoutEmail, matchType: "name" };

  return null;
};

module.exports = {
  certificateRecipients,
  findCertificateRecipient,
  normalizeEmail,
  normalizeName,
};
