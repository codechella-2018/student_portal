

/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Student Portal!"
    };
  },
  created: function() {},
  methods: {},
  computed: {}
};

var StudentShowPage = {
  template: "#student-show-page",
  data: function() {
    return {
      message: "Student Resume Portal",
      student: {}
    };
  },
  created: function() {
    axios.get("/student.json").then(function(response) {
      this.student = response.data;
      console.log(this.student);
    }.bind(this));
  },
  methods: {
    // deleteUser: function(student) {
    //   axios.delete("/api/users/" + user.id).then(function(response) { router.push("/");
    //   })
    //   .catch(
    //     function(error) {
    //       this.errors = error.response.data.errors;
    //     }.bind(this)
    //   );
    // },
  },
  computed: {}
};


var LoginPage = {
  template: "#login-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    }
  }
};


var LogoutPage = {
  template: "<h1>Logout</h1>",
  created: function() {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("jwt");
    router.push("/");
  }
};

var StudentEditPage = {
  template: "#student-edit-page",
  data: function() {
    return {
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      short_bio: "",
      linkedin_url: "",
      twitter_handle: "",
      personal_blog_website_url: "",
      online_resume_url: "",
      github_url: "",
      photo: "",
      errors: []
    };
  },
  created: function() {
    axios.get("/student.json").then(function(response) {
      this.id = response.data.id;
      this.first_name = response.data.first_name;
      this.last_name = response.data.last_name;
      this.email = response.data.email;
      this.phone_number = response.data.phone_number;
      this.short_bio = response.data.short_bio;
      this.linkedin_url = response.data.linkedin_url;
      this.twitter_handle = response.data.twitter_handle;
      this.personal_blog_website_url = response.data.personal_blog_website_url;
      this.online_resume_url = response.data.online_resume_url;
      this.github_url = response.data.github_url;
      this.photo = response.data.photo;
    }.bind(this));
  },
  methods: {
    submit: function() {
      var params = { 
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone_number: this.phone_number,
      short_bio: this.short_bio,
      linkedin_url: this.linkedin_url,
      twitter_handle: this.twitter_handle,
      personal_blog_website_url: this.personal_blog_website_url,
      online_resume_url: this.online_resume_url,
      github_url: this.github_url,
      photo: this.photo,
      };
      axios
      .patch("/student.json")
      .then(function(response) {
        router.push("/");
      })
      .catch(
        function(error) {
          this.errors = error.response.data.errors;
        }.bind(this)
      );
    },
  },
};  

var ExperienceEditPage = {
  template: "#experience-edit-page",
  data: function() {
    return {
      id: "",
      start_date: "",
      end_date: "",
      job_title: "",
      company_name: "",
      details: "",
      student_id: "", 
      errors: []
    };
  },
  created: function() {
    axios.get("/student.json").then(function(response) {
      this.id = response.data.id;
      this.start_date = response.data.start_date;
      this.end_date = response.data.end_date;
      this.job_title = response.data.job_title;
      this.company_name = response.data.company_name;
      this.details = response.data.details;
    }.bind(this));
  },
  methods: {
    submit: function() {
      var params = { 
      id: this.id,
      start_date: this.start_date,
      end_date: this.end_date,
      job_title: this.job_title,
      company_name: this.company_name,
      details: this.details,
      };
      axios
      .patch("/student.json")
      .then(function(response) {
        router.push("/");
      })
      .catch(
        function(error) {
          this.errors = error.response.data.errors;
        }.bind(this)
      );
    },
  },
}; 

var EducationEditPage = {
  template: "#resume-edit-page",
  data: function() {
    return {
      id: "",
      start_date: "",
      end_date: "",
      degree: "",
      university_name: "",
      details: "",
      student_id: "", 
      errors: []
    };
  },
  created: function() {
    axios.get("/student.json").then(function(response) {
     this.id = response.data.id;
     this.start_date = response.data.start_date;
     this.end_date = response.data.end_date;
     this.degree = response.data.degree;
     this.university_name = response.data.university_name;
     this.details = response.data.details;
     this.student_id =response.data.student_id;
    }.bind(this));
  },
  methods: {
    submit: function() {
      var params = { 
      id: this.id,
      start_date: this.start_date,
      end_date: this.end_date,
      degree: this.degree,
      university_name: this.university_name,
      details: this.details,
      student_id: this.student_id,
      };
      axios
      .patch("/student.json")
      .then(function(response) {
        router.push("/");
      })
      .catch(
        function(error) {
          this.errors = error.response.data.errors;
        }.bind(this)
      );
    },
  },
}; 

var SkillEditPage = {
  template: "#skill-edit-page",
  data: function() {
    return {
      id: "",
      name: "",
      student_id: "",
      errors: []
    };
  },
  created: function() {
    axios.get("/student.json").then(function(response) {
      this.id = response.data.id;
      this.name = response.data.name;
      this.student_id = response.data.student_id;
    }.bind(this));
  },
  methods: {
    submit: function() {
      var params = { 
      id: this.id,
      name: this.name,
      student_id: this.student_id,
      };
      axios
      .patch("/student.json")
      .then(function(response) {
        router.push("/");
      })
      .catch(
        function(error) {
          this.errors = error.response.data.errors;
        }.bind(this)
      );
    },
  },
}; 

var CapstoneEditPage = {
  template: "#capstone-edit-page",
  data: function() {
    return {
      id: "",
      name: "",
      description: "",
      url: "",
      screenshot: "",
      student_id: "",
      errors: []
    };
  },
  created: function() {
    axios.get("/student.json").then(function(response) {
      this.id = response.data.id;
      this.name = response.data.name;
      this.description = response.data.description;
      this.url = response.data.url;
      this.screenshot = response.data.screenshot;
      this.student_id = response.data.student_id;
    }.bind(this));
  },
  methods: {
    submit: function() {
      var params = { 
      id: this.id,
      name: this.name,
      description: this.description,
      url: this.url,
      screenshot: this.screenshot,
      student_id: this.student_id,
      };
      axios
      .patch("/student.json")
      .then(function(response) {
        router.push("/");
      })
      .catch(
        function(error) {
          this.errors = error.response.data.errors;
        }.bind(this)
      );
    },
  },
}; 

var router = new VueRouter({
  routes: [
  { path: "/", component: HomePage },
  { path: "/students/:id", component: StudentShowPage },
  { path: "/login", component: LoginPage },
  { path: "/logout", component: LogoutPage },
  { path: "/students/:id/edit", component: StudentEditPage },
  { path: "/experiences/:id/edit", component: ExperienceEditPage },
  { path: "/educations/:id/edit", component: EducationEditPage },
  { path: "/skills/:id/edit", component: SkillEditPage },
  { path: "/capstones/:id/edit", component: CapstoneEditPage }
],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});


var app = new Vue({
  el: "#vue-app",
  router: router,
  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
  }
});
