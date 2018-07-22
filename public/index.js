

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

var ResumeEditPage = {
  template: "#resume-edit-page",
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


var router = new VueRouter({
  routes: [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  { path: "/logout", component: LogoutPage },
  { path: "/students/:id/edit", component: ResumeEditPage }
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
