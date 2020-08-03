<template>
  <div class="float-Keyboard" v-bind:class="{ expand: isToogle }">
    <img class="wow fadeInLeft float-logo" src="../assets/img/float-logo.svg" />
    <div class="keyboard wow fadeInUp" data-wow-delay=".5s">
      <img src="../assets/img/logo.png" alt class="teste" />
      <h2>Informe os dados abaixo</h2>
      <form>
        <input
          type="tel"
          placeholder="Informe seu CPF"
          v-model="form.cpf"
          v-mask="'###.###.###-##'"
        />
        <span class="inputAlert alertAttention" v-if="errors.cpf">{{errors.cpf[0]}}</span>
        <input type="password" placeholder="Informe sua senha" v-model="form.password" />
        <span class="inputAlert alertAttention" v-if="errors.password">{{errors.password[0]}}</span>
        <a class="ui-commandlink ui-widget button btnSecundary" @click.prevent="signIn">Conectar</a>
        <a
          class="ui-commandlink ui-widget button btnPrimary"
          @click.prevent="register"
        >Quero me cadastrar</a>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import authService from "@/services/auth.service";
import guestService from "@/services/guest.service";

export default {
  name: "Login",
  data() {
    return {
      errors: "",
      form: {
        cpf: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      isToogle: "toogle/isToogle"
    })
  },
  props: {
    client: Object
  },
  methods: {
    ...mapActions({
      toogle: "toogle/toogled",
      loading: "loader/show"
    }),
    signIn() {
      this.loading(true);
      authService
        .signIn(this.form)
        .then(result => {
          this.errors = "";
          this.authorizeGuest(result.data.token);
        })
        .catch(err => {
          this.loading(false);
          if (!err.response) {
            return this.$swal({
              type: "error",
              title: "Acorreu um Erro!!",
              text: "Impossível conectar no servidor da aplicação."
            });
          }

          if (err.response.data.validation) {
            this.errors = err.response.data.validation;
          } else {
            this.errors = "";
          }
          return this.$swal({
            type: err.response.data.type,
            title: err.response.data.title,
            text: err.response.data.message
          });
        });
    },
    authorizeGuest(token) {
      guestService
        .authorize(this.client, token)
        .then(() => {
          this.loading(false);
          location.href = "http://sicoobcredivaz.com.br";
        })
        .catch(err => {
          this.errors = "";
          this.loading(false);
          this.$swal({
            type: err.response.data.type,
            title: err.response.data.title,
            text: err.response.data.message
          });
        });
    },
    register() {
      this.toogle(true);
    }
  }
};
</script>