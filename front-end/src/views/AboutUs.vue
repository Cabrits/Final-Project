<!--About Us Page, containes information about the people who created this project-->

<template>
  <Header />
  <div class="ourTeam">
    <h2>Our Team</h2>
    <div class="teamMembers">
      <div v-for="(member, index) in teamMembers" :key="index" class="member">
        <div class="memberInfo">
          <img class="memberPicture" :src="member.image" :alt="member.name" />
          <div class="memberDetails">
            <h3>{{ member.name }}</h3>
            <p class="memberRole">{{ member.role }}</p>
            <p class="memberInfoBox">{{ member.info }}</p>
          </div>
        </div>
        <div class="socialLinks">
          <a
            v-if="member.socialNetworkLink"
            :href="member.socialNetworkLink"
            :class="member.socialNetworkClass"
            target="_blank"
          >
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

  // Team Members Data
  data() {
    return {
      teamMembers: [
        {
          name: "Duarte Cabrita",
          role: "Front End Developer",
          socialNetwork: "twitter",
          socialNetworkLink: "https://twitter.com/",
          githubLink: "https://github.com/Cabrits",
          info: "Universidade Autónoma de Lisboa student and Front End enthusiast with a good eye for design. Learning Vue JS and wanting to explore more frameworks to expand my knowledge on this field. Loves music while chilling outside, sports and casually watch some anime.",
          image: "src/assets/1.jpg",
          socialNetworkIcon: "fab fa-twitter ",
          socialNetworkClass: "twitterLink",
        },
        {
          name: "Nuno Cartaxo",
          role: "Back End Developer",
          socialNetwork: "linkedin",
          socialNetworkLink: "https://www.linkedin.com/in/nuno-cartaxo-it/",
          githubLink: "https://github.com/NunoCartaxoUAL/",
          info: "Computer Science student with network administration experience. I'm proficient in Java, Python, and JavaScript, and familiar with Kotlin, SQL, NoSQL (MongoDB), and cloud computing (AWS, GCP). I also received Cisco training and have knowledge of Vue.js and Express.",
          image: "src/assets/nuno.jpg",
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

.ourTeam {
  text-align: center;
  font-size: 30px;
  color: white;
}

.ourTeam h2 {
  text-shadow: 0 0 3px #000000, 0 0 3px #000000;
}

.teamMembers {
  display: flex;
  justify-content: center;
  gap: 200px;
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
  width: 300px;
  height: 540px;
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
  gap: 40px;
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

.socialLinks .twitterLink {
  background-color: rgb(0, 172, 238);
  border: 1px solid white;
}

.socialLinks .githubLink {
  background-color: rgb(59, 59, 59);
  border: 1px solid white;
}

/*Responsive*/

@media screen and (max-width: 800px) {
  .teamMembers {
    flex-direction: column;
    align-items: center;
    gap: 50px;
  }
}

@media screen and (max-width: 500px) {
  .member {
    width: 280px;
  }
}
</style>
