<template>
  <div id="adduser" class="content">
    <br/>
    <h3 class="left">Ajouter Utilisateur :</h3>
    <hr/>
    <br/>
    <form class="pure-form pure-form-stacked" v-on:submit.prevent="doLogin" id="form">
  <fieldset>
    <legend>Connection</legend>
    <label for="username">Username</label>
    <input id="username" v-model="user.username" type="text" placeholder="Username">

    <label for="password">Password</label>
    <input id="password" v-model="user.password" type="password" placeholder="Password">

    <button type="submit" class="pure-button pure-button-primary">Se connecter</button>
    <p v-if="submitData">{{submitData|json}}</p>
  </fieldset>
</form>
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      user: {
        username: null,
        password: null
      },
      submitData: null
    }
  },
  methods: {
    doLogin () {
      this.submitData = this.user
    }
  }
}
</script>