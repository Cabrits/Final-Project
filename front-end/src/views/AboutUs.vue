<!--About Us Page, containes information about the people who created this project-->

<template>
  <Header />
  <div class="ourTeam">
    <h2>About Us</h2>
    <div class="infoContainer">
      <div class="websiteInfo">
      <p>VibeVault is your ultimate destination for manga sales. Discover a wide range of captivating titles across various genres, immerse yourself in thrilling adventures, and indulge in heartfelt stories. 
        With a user-friendly website, convenient ordering options, and a vibrant community, VibeVault is where manga enthusiasts find their next unforgettable read. Start exploring the captivating world of manga today with VibeVault.</p>
    </div>
    </div>
    <h2>Our Team</h2>
    <div class="teamMembers">
      <div v-for="(member, index) in teamMembers" :key="index" class="member">
        <div class="memberInfo">
          <img class="memberPicture" :src="member.image" />
          <div class="memberDetails">
            <h3>{{ member.name }}</h3>
            <p class="memberRole">{{ member.role }}</p>
            <p class="memberInfoBox">{{ member.info }}</p>
          </div>
        </div>
        <div class="socialLinks">
          <a v-if="member.socialNetworkLink" :href="member.socialNetworkLink" :class="member.socialNetworkClass" target="_blank">
            <i :class="member.socialNetworkIcon"></i>
          </a>
          <a :href="member.githubLink" class="githubLink" target="_blank">
            <i class="fab fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "AboutUs",
  components: { Header, Footer },

  created(){
    window.scrollTo(0, 0);
  },

  // Team Members Data
  data() {
    return {
      teamMembers: [
        {
          name: "Duarte Cabrita",
          role: "Front End Developer",
          socialNetwork: "linkedin",
          socialNetworkLink: "https://www.linkedin.com/in/duarte-cabrita-b4836a256/",
          githubLink: "https://github.com/Cabrits",
          info: "Universidade Autónoma de Lisboa student and Front End enthusiast with a good eye for design. Learning Vue JS and wanting to explore more frameworks to expand my knowledge on this field. Loves music while chilling outside, sports and casually watch some anime.",
          image: "src/assets/duarte.jpg",
          socialNetworkIcon: "fab fa-linkedin ",
          socialNetworkClass: "linkedinLink",
        },
        {
          name: "Nuno Cartaxo",
          role: "Back End Developer",
          socialNetwork: "linkedin",
          socialNetworkLink: "https://www.linkedin.com/in/nuno-cartaxo-it/",
          githubLink: "https://github.com/NunoCartaxoUAL/",
          info: "Computer Science student with network administration experience. I'm proficient in Java, Python, and JavaScript, and familiar with Kotlin, SQL, NoSQL (MongoDB), and cloud computing (AWS, GCP). I also received Cisco training and have knowledge of Vue.js and Express.",
          image: "src/assets/nuno.jpg",
          socialNetworkIcon: "fab fa-linkedin ",
          socialNetworkClass: "linkedinLink",
        },
        {
          name: "Rajiv Chaves",
          role: "Front End Helper",
          socialNetwork: "linkedin",
          socialNetworkLink: "",
          githubLink: "",
          info: "",
          image: "src/assets/template.png",
          socialNetworkIcon: "fa fa-linkedin ",
          socialNetworkClass: "linkedinLink",
        },
        {
          name: "Kataryna Janeczko",
          role: "Back End Helper",
          socialNetwork: "linkedin",
          socialNetworkLink: "",
          githubLink: "",
          info: "",
          image: "src/assets/template.png",
          socialNetworkIcon: "fa fa-linkedin ",
          socialNetworkClass: "linkedinLink",
        },
      ],
    };
  },
};
</script>

<style scoped>
/*Our Team*/

.infoContainer {
  max-width: 1000px;
  margin: 0 auto;
  padding: 10px;
  margin-bottom: 30px;
}

.websiteInfo {
  background-color: rgb(58, 56, 53);
  opacity: 0.9;
  width: 98%;
  font-size: 20px;
  padding: 10px;
  border: 2px solid white;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 20px 15px 5px rgba(109, 106, 106, 0.8);
}

.ourTeam {
  text-align: center;
  font-size: 30px;
  color: white;
  padding-bottom: 40px;
}

.ourTeam h2 {
  text-shadow: 0 0 3px #000000, 0 0 3px #000000;
}

.teamMembers {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  padding-top: 20px;
  margin-bottom: 20px;
}

/*Each Member Card*/

.member {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: rgb(58, 56, 53);
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  width: 280px;
  height: auto;
  border: 2px solid white;
  box-shadow: 20px 15px 5px rgba(109, 106, 106, 0.8);
}

.memberInfo {
  text-align: center;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
  align-items: center;
}

.memberPicture {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 2px solid white;
  margin-top: -5px;
  transition: 1s;
}

.memberPicture:hover {
  transform: scale(1.05);
  transition: 1s;
}

.memberDetails {
  text-align: center;
  flex-grow: 1;
  margin-bottom: 20px;
  margin-top: 10px;
}

.member h3 {
  margin-top: 3px;
  font-size: 20px;
  margin-bottom: 15px;
}

.member p {
  margin-top: 5px;
  font-size: 14px;
  color: #ffffff;
}

.memberRole {
  font-weight: bold;
  font-size: 15px !important;
  margin-top: 30px !important;
  color: rgb(247, 218, 191) !important;
}

.memberInfoBox {
  margin-top: 30px !important;
  line-height: 1.5;
}

.socialLinks {
  display: flex;
  margin-top: -20px;
  gap: 20px;
}

.socialLinks a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #333;
  color: #fff;
  border-radius: 50%;
  font-size: 20px;
}

.socialLinks a:hover {
  background-color: rgb(132, 115, 100);
}

.socialLinks .linkedinLink {
  background-color: rgb(0, 119, 181);
  border: 1px solid white;
}

.socialLinks .githubLink {
  background-color: rgb(59, 59, 59);
  border: 1px solid white;
}

/*Responsive*/

@media screen and (max-width: 980px) {
  .websiteInfo {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
}

@media screen and (max-width: 800px) {
  .teamMembers {
    flex-direction: column;
    align-items: center;
    gap: 50px;
  }
}

@media screen and (max-width: 480px) {
  .ourTeam h2 {
    font-size: 24px;
  }


  .member {
    width: 100%;
    max-width: 280px;
  }

  .memberPicture {
    width: 150px;
    height: 150px;
  }
}

</style>
