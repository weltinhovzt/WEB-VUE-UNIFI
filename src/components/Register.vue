<template>
  <section class="content" v-bind:class="{ visible: isToogle }">
    <span class="close-summary simpleIcon icone-fechar" @click.prevent="close"></span>
    <div class="newAccess" v-bind:class="{ visible: isToogle }">
      <div class="form-access">
        <h2>Novo cadastro</h2>
        <span id="alertasCadastro:errosCadastro"></span>
        <span id="panelGeralNovoCadastro">
          <p>Preencha as informações corretamente para criar a sua conta de acesso</p>
          <p>
            <strong>Todos os campos são de preenchimento obrigatório.</strong>
          </p>
          <span id="panelSteps">
            <div class="steps">
              <h3>
                <strong>Dados básicos</strong>
              </h3>
            </div>
          </span>
          <span class="formulario-padrao">
            <span>
              <form>
                <input type="text" placeholder="Informe seu Nome" v-model="form.name" />
                <span class="inputAlert alertAttention" v-if="errors.name">{{errors.name[0]}}</span>
                <input type="email" placeholder="Informe seu E-mail" v-model="form.email" />
                <span class="inputAlert alertAttention" v-if="errors.email">{{errors.email[0]}}</span>
                <input
                  type="tel"
                  placeholder="Informe seu CPF"
                  v-model="form.cpf"
                  v-mask="'###.###.###-##'"
                />
                <span class="inputAlert alertAttention" v-if="errors.cpf">{{errors.cpf[0]}}</span>
                <input
                  type="tel"
                  placeholder="Informe seu Celular"
                  v-model="form.phone"
                  v-mask="'(##) # ####-####'"
                />
                <span class="inputAlert alertAttention" v-if="errors.phone">{{errors.phone[0]}}</span>
                <input type="password" placeholder="Informe sua Senha" v-model="form.password" />
                <span
                  class="inputAlert alertAttention"
                  v-if="errors.password"
                >{{errors.password[0]}}</span>
                <input
                  type="password"
                  placeholder="Confirme sua Senha"
                  v-model="form.password_confirmation"
                />
                <span
                  class="inputAlert alertAttention"
                  v-if="errors.password_confirmation"
                >{{errors.password_confirmation[0]}}</span>
                <a
                  class="ui-commandlink ui-widget button btnPrimary"
                  @click.prevent="terms"
                >Registrar</a>
              </form>
            </span>
          </span>
        </span>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import userService from "@/services/user.service";

export default {
  name: "Register",
  data() {
    return {
      errors: "",
      form: {
        name: "",
        cpf: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
        terms: false
      }
    };
  },
  computed: {
    ...mapGetters({
      isToogle: "toogle/isToogle"
    })
  },
  methods: {
    ...mapActions({
      toogle: "toogle/toogled",
      loading: "loader/show"
    }),
    close() {
      this.toogle(false);
    },
    register() {
      this.loading(true);
      userService
        .signUp(this.form)
        .then(result => {
          this.errors = "";
          this.loading(false);
          this.toogle(false);
          return this.$swal({
            type: result.data.type,
            title: result.data.title,
            text: result.data.message
          });
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
          }
          return this.$swal({
            type: err.response.data.type,
            title: err.response.data.title,
            text: err.response.data.message
          });
        });
    },
    terms() {
      this.$swal({
        type: "warning",
        title: "Termos de Uso",
        html:
          '<div class="terms">' +
          "TERMOS DE USO WIFI SICOOB CREDIVAZ</br></br>" +
          "TERMO E CONDIÇÕES DE USO DO SERVIÇO “WI-FI SICOOB CREDIVAZ”</br></br>" +
          "1. DEFINIÇÕES</br></br>" +
          "1.1 O Serviço WI-FI DO SICOOB CREDIVAZ é um serviço de acesso à internet sem-fio exclusivo para a cooperativa e seus associados através de dispositivos móveis, tais como: smartphones, notebooks, tablets, etc…, onde o Sicoob Credivaz com o uso do (“firewall”) poderá limitar o acesso em determinados sites e fazer o devido controle dos usuários que estão acessando a rede. Ao Cliente que aceitar o presente Termo de uso do serviço “WI-FI SICOOB CREDIVAZ”.</br></br>" +
          "1.2 O Serviço WI-FI SICOOB CREDIVAZ é um serviço adicional, fornecido em caráter de cortesia, aos ASSOCIADOS de acesso à internet da cooperativa, bem como a VISITANTES e ASSOCIADOS devidamente cadastrados.</br></br>" +
          "2. UTILIZAÇÃO</br></br>" +
          "2.1 Todo ASSOCIADO que localizar a rede sem-fio WI-FI SICOOB CREDIVAZ, poderá autenticar e utilizar os serviços, mediante a um cadastro prévio.</br></br>" +
          "2.2 Para utilizar basta cadastrar o nome, CPF, E-mail, número de celular e criar uma senha de acesso na rede disponibilizada pela cooperativa, momento em que será direcionado a leitura deste Termo de Utilização. Caso concorde com os termos expostos e expresse essa concordância por meio do sistema, poderá utilizar a rede WI-FI.</br></br>" +
          "2.3 Todo ASSOCIADO e VISITANTE terá o serviço disponível por 08 horas/diárias para utilização do seu acesso a uma velocidade de 50 Mbps.</br></br>" +
          "2.4 O serviço prestado atualmente não acarreta nenhum custo aos ASSOCIADOS e VISITANTES.</br></br>" +
          "3. DIREITOS DO ASSOCIADO DO WI-FI SICOOB CREDIVAZ</br></br>" +
          "3.1 Ter acesso ao Serviço conforme este TERMO E CONDIÇÕES DE USO, por meio de CPF e senha de acesso definidos no momento do cadastro, de forma individual, pessoal e intransferível.</br></br>" +
          "3.1.1 Receber tratamento não discriminatório quanto ao conteúdo a ser acessado.</br></br>" +
          "4. OBRIGAÇÕES DO ASSOCIADO e VISITANTE DO WI-FI SICOOB CREDIVAZ</br></br>" +
          "4.1 Possuir o equipamento necessário para que o serviço possa ser utilizado.</br></br>" +
          "4.2 Manter em sigilo e não compartilhar seus dados de acesso à rede.</br></br>" +
          "4.3 Indenizar eventuais danos que vier a causar à terceiros, ocasionados pela má utilização do Serviço ou pelo descumprimento das disposições contidas no presente Contrato.</br></br>" +
          "4.5 Isentar a cooperativa de qualquer responsabilidade pela reparação de qualquer dano ocorrido em seus equipamentos em razão da sua utilização inadequada.</br></br>" +
          "4.6 Não utilizar o Serviço para fins ilícitos ou para qualquer outro fim diferente daquele originalmente destinado, tais como, sem limitação, envio de vírus, Spams e demais atividades não autorizadas.</br></br>" +
          "4.7 O USUÁRIO do WI-FI SICOOB CREDIVAZ não poderá utilizar o serviço para propagar ou manter Portal ou Site(s) na Internet com conteúdo que: </br></br>(a) violem a lei, a moral, os bons costumes, a propriedade intelectual, os direitos à honra, à vida privada, à imagem, à intimidade pessoal e familiar; </br></br>(b) estimulem a prática de condutas ilícitas ou contrárias à moral e aos bons costumes; </br></br>(c) incitem a prática de atos discriminatórios, seja em razão de sexo, raça, religião, crenças, idade ou qualquer outra condição; </br></br>(d) coloquem à disposição ou possibilitem o acesso a mensagens, produtos ou serviços ilícitos, violentos, pornográficos, degradantes;</br></br> (e) induzam ou possam induzir a um estado inaceitável de ansiedade ou temor; </br></br>(f) induzam ou incitem práticas perigosas, de risco ou nocivas para a saúde e para o equilíbrio psíquico </br></br>(g) sejam falsos, ambíguos, inexatos, exagerados ou extemporâneos, de forma que possam induzir a erro sobre seu objeto ou sobre as intenções ou propósitos do comunicador; </br></br>(h) violem o sigilo das comunicações;</br></br> (i) constituam publicidade ilícita, enganosa ou desleal, em geral, que configurem concorrência desleal e/ou denominados “spam-mails”; </br></br>(j) veiculem, incitem ou estimulem a pedofilia; </br></br>(k) incorporem vírus ou outros elementos físicos ou eletrônicos que possam danificar ou impedir o normal funcionamento da rede, do sistema ou dos equipamentos informáticos (hardware e software) de terceiros ou que possam danificar os documentos eletrônicos e arquivos armazenados nestes equipamentos informáticos.</br></br>" +
          "4.8 O USUÁRIO do WI-FI SICOOB CREDIVAZ será responsável civil e criminalmente por todo e qualquer dano causado à COOPERATIVA ou a TERCEIROS por meio do acesso à internet realizado com o seu CPF e sua senha de acesso, devendo tomar todas as medidas necessárias para proteger e impedir a utilização de seu nome de usuário e senha de acesso por quaisquer terceiros.</br></br>" +
          "5. DISPOSIÇÕES GERAIS</br></br>" +
          "5.1 O SICOOB CREDIVAZ reserva-se ao direito de bloquear portas, protocolos e serviços de Internet que considere nocivos a seus clientes, que possam comprometer a disponibilidade do serviço.</br></br>" +
          "5.2 A velocidade disponível de acesso pode ter oscilações e variações conforme a distância que o ASSOCIADO estiver da Access Point, o número de USUÁRIOS autenticados simultaneamente, do dispositivo utilizado para conexão de dados, das aplicações utilizadas e de outros fatores externos que venham a interferir na qualidade do serviço.</br></br>" +
          "6. FORO</br></br>" +
          "6.1 O presente instrumento obriga os usuários do WI-FI SICOOB CREDIVAZ, a qualquer tempo, sendo neste ato eleito o foro da comarca da cidade de VAZANTE, estado de MINAS GERAIS, competente para dirimir quaisquer questões referentes ao presente, com renúncia expressa de qualquer outro, por mais privilegiado que seja.</br></br>" +
          "</div>",
        showCancelButton: true,
        confirmButtonText: "Aceito!",
        cancelButtonText: "Cancelar!"
      }).then(result => {
        if (result.value) {
          this.form.terms = true;
          this.register();
        }

        if (!result.value) {
          this.$swal(
            "Atenção!",
            "Você precisa aceitar os termos para cadastrar!",
            "warning"
          );
        }
      });
    }
  }
};
</script>
<style lang="scss">
.terms {
  height: 150px !important;
  overflow: auto !important;
  text-align: justify !important;
  border: 1px solid #595959;
  padding: 10px;
}
</style>
