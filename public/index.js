

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


var router = new VueRouter({
  routes: [
  { path: "/", component: HomePage },
  { path: "/students/:id", component: StudentShowPage },
  { path: "/login", component: LoginPage },
  { path: "/logout", component: LogoutPage }

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
