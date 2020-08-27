<template>
  <v-container>
    <v-col class="navLang">
      <v-btn-toggle v-model="currentLang" mandatory @change="switchLang">
        <v-btn v-for="(lang, i) in langs" :key="i">
          {{ $t(lang) }}
        </v-btn>
      </v-btn-toggle>
    </v-col>
    <div class="contain">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-col>
          <p>{{ $t("renderEngine") }}</p>
          <v-select
            outlined
            dense
            :items="engines"
            item-text="name"
            :rules="rules"
            v-model="selectedEngine"
            :placeholder="$t('selectEngine')"
          ></v-select>
        </v-col>
        <v-col>
          <p>{{ $t("htmlZip") }}</p>
          <v-file-input
            outlined
            dense
            prepend-icon
            accept=".zip"
            :rules="rules"
            v-model="file"
            :placeholder="$t('inputFile')"
          ></v-file-input>
        </v-col>
      </v-form>
      <v-col class="col-btn">
        <v-btn
          color="#2196F3"
          style="width:150px;"
          rounded
          dark
          @click="confirm()"
          >{{ $t("startRender") }}</v-btn
        >
      </v-col>
    </div>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-snackbar v-model="snackbar" top color="error" text>
      {{ errorText }}
      <v-btn @click="snackbar = false" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { render } from "@/api";
export default {
  data() {
    return {
      engines: [],
      selectedEngine: null,
      file: null,
      overlay: false,
      rules: [v => !!v || `${this.$t("required")}`],
      valid: true,
      snackbar: false,
      langs: this.$i18n.availableLocales,
      currentLang: this.$i18n.locale,
      errorText: null
    };
  },
  methods: {
    async confirm() {
      if (this.$refs.form.validate()) {
        this.overlay = true;
        let formData = new FormData();
        formData.append("engine", this.selectedEngine);
        formData.append("file", this.file);
        try {
          const result = await render.renderData(formData);
          this.overlay = false;

          const fileURL = URL.createObjectURL(
            new Blob([result.data], { type: "application/pdf" })
          );
          const link = document.createElement("a");
          link.href = fileURL;
          link.setAttribute("target", "_blank");
          document.body.appendChild(link);
          link.click();
        } catch (err) {
          const encode = new TextDecoder("utf-8");
          const errorBody = JSON.parse(
            encode.decode(new Uint8Array(err.response.data))
          );
          this.errorText = this.$t(errorBody.err);
          this.overlay = false;
          this.snackbar = true;
        }
      }
    },
    switchLang() {
      this.$refs.form.reset();
      const selectedLang = this.langs[this.currentLang];
      this.$i18n.locale = selectedLang;
    }
  },
  async mounted() {
    this.currentLang = this.$i18n.availableLocales.indexOf(this.$i18n.locale);
    try {
      const allEngines = await render.getEngines();
      this.engines = allEngines.data.data;
    } catch {
      /* empty */
    }
  }
};
</script>

<style>
.navLang {
  position: absolute;
  width: 100px !important;
  left: 80%;
  top: 3%;
}
.contain {
  margin: 0px auto;
  margin-top: 10%;
  width: 60% !important;
}
.col {
  display: flex;
  flex-direction: row;
  padding: 5px 100px 5px 50px;
}
p {
  padding-top: 10px;
  width: 15%;
  font-size: 14px;
  margin-right: 25px;
  margin-bottom: 10px;
  font-weight: 500;
}
.col-btn {
  justify-content: flex-end;
}
</style>
