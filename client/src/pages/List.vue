<template>
  <div class="row q-col-gutter-xs">
    <div
      class="col-xs-12 col-sm-12 offset-md col-md-4 offset-md-4 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3"
    >
      <div class="row text-center list statistics">
        <div class="col-xs-12">
          <!-- <div class="q-pb-md q-pt-md text-h6 ">{{list.title}}</div> -->
          <div class="q-pb-md q-pt-md text-h6 title">
            {{ list.title }}
          </div>
          <div class="q-pb-md q-pt-md text-h6 description">
            {{ list.description }}
          </div>
          <div class="q-pb-md q-pt-md text-h6 amount">
            Flashcards: {{ list.flashcards.length }}
          </div>
          <div class="q-pb-md q-pt-md text-h6 views">
            Views: {{ list.views }}
          </div>
        </div>
        <div class="col-xs-12 col-md-12 col-lg-6">
          <div class="q-pb-md q-pt-md text-h6 statistics correct-answers">
            Correct Answers: {{ this.listNumberOfAllCorrectAnswers }}
          </div>
        </div>
        <div class="col-xs-12 col-md-12 col-lg-6">
          <div class="q-pb-md q-pt-md text-h6 statistics incorrect-answers">
            Incorrect Answers: {{ this.listNumberOfAllIncorrectAnswers }}
          </div>
        </div>
        <div class="col-xs-12">
          <div class="q-pb-md q-pt-md text-h6 statistics accuracy">
            Accuracy: {{ isNaN(this.listAccuracy) ? 0 : this.listAccuracy }} %
          </div>
        </div>
      </div>
    </div>
    <div
      class="col-xs-12 col-sm-12 offset-md col-md-12 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2"
      id="list"
    >
      <!-- <div class="row">
      <div class="col-xs-12  q-mb-md">
        <trend
          class="trend"
          :data="chart"
          
          :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
          auto-draw
          smooth
        >
        </trend>
      </div>
    </div> -->
      <div class="row">
        <div
          class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-mt-lg q-mb-lg q-pa-xs"
          v-for="flashcard in list.flashcards"
          :key="flashcard._id"
        >
          <q-card
            flat
            class="my-card flashcard"
          >
            <q-card-section>
              <div class="row items-center no-wrap">
                <div class="col text-center">
                  <div class="word first-language q-pb-xs q-pt-xs text-h4">
                    {{ flashcard.firstLanguage }}
                  </div>
                  <div class="word second-language q-pb-xs q-pt-xs text-h4">
                    {{ flashcard.secondLanguage }}
                  </div>

                  <div class="q-pb-xs q-pt-xs text-h6 statistics left-align">
                    <span class="q-pa-xs">
                      <q-badge class="badge correct-answers">
                        {{
                          isNaN(flashcard.statistics.correctAnswers)
                            ? 0
                            : flashcard.statistics.correctAnswers
                        }}
                        %
                      </q-badge>
                    </span>

                    <span class="q-pa-xs">
                      <q-badge class="badge incorrect-answers">
                        {{
                          isNaN(flashcard.statistics.incorrectAnswers)
                            ? 0
                            : flashcard.statistics.incorrectAnswers
                        }}
                        %
                      </q-badge>
                    </span>

                    <span class="q-pa-xs">
                      <q-badge class="badge accuracy">
                        {{
                          isNaN(
                            parseFloat(
                              (flashcard.statistics.correctAnswers /
                                (flashcard.statistics.correctAnswers +
                                  flashcard.statistics.incorrectAnswers)) *
                                100,
                            ).toFixed(2),
                          )
                            ? 0
                            : parseFloat(
                              (flashcard.statistics.correctAnswers /
                                (flashcard.statistics.correctAnswers +
                                  flashcard.statistics.incorrectAnswers)) *
                                100,
                            ).toFixed(2)
                        }}
                        %
                      </q-badge>
                    </span>
                  </div>
                </div>

                <q-btn
                  color=""
                  round
                  flat
                  icon="more_vert"
                  class="button-action"
                >
                  <q-menu
                    cover
                    auto-close
                  >
                    <q-list>
                      <q-item
                        clickable
                        @click="openPromptUpdateFlashcard(flashcard)"
                      >
                        <q-item-section>Update flashcard</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        @click="openPromptDeleteFlashcard(flashcard)"
                      >
                        <q-item-section>Delete flashcard</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <q-page-sticky
        position="bottom-right"
        :offset="[18, 18]"
      >
        <!-- <q-btn fab icon="post_add" @click="openPromptCreateFlashcard" /> -->
        <q-fab
          icon="widgets"
          direction="up"
        >
          <q-fab-action
            fab
            icon="post_add"
            @click="openPromptCreateFlashcard"
          />
          <q-fab-action
            fab
            icon="print"
            @click="printList"
          />
          <q-fab-action
            icon="play_arrow"
            @click="viewQuiz"
          />
        </q-fab>  
      </q-page-sticky>

      <!--  Dialog - Create flashcard -->
      <q-dialog
        v-model="promptCreateFlashcard"
        persistent
      >
        <q-card style="min-width: 350px;">
          <form c>
            <q-card-section>
              <div class="text-h6">
                Create flashcard
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-input
                filled
                v-model="formCreateFlashcard.firstLanguage"
                label="First language"
                :error="$v.formCreateFlashcard.firstLanguage.$error"
                class="q-pb-lg"
              >
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>
              <q-input
                filled
                v-model="formCreateFlashcard.secondLanguage"
                label="Second language"
                :error="$v.formCreateFlashcard.secondLanguage.$error"
                class="q-pb-lg"
              >
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>
            </q-card-section>

            <q-card-actions
              align="right"
              class="text-primary"
            >
              <q-btn
                flat
                label="Cancel"
                v-close-popup
              />
              <q-btn
                flat
                label="Create flashcard"
                @click="createFlashcard"
              />
            </q-card-actions>
          </form>
        </q-card>
      </q-dialog>

      <!--  Dialog - Update flashcard -->
      <q-dialog
        v-model="promptUpdateFlashcard"
        persistent
      >
        <q-card style="min-width: 350px;">
          <form c>
            <q-card-section>
              <div class="text-h6">
                Update word
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-input
                filled
                v-model="formUpdateFlashcard.firstLanguage"
                label="First language"
                :error="$v.formUpdateFlashcard.firstLanguage.$error"
                class="q-pb-lg"
              >
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>
              <q-input
                filled
                v-model="formUpdateFlashcard.secondLanguage"
                label="Second language"
                :error="$v.formUpdateFlashcard.secondLanguage.$error"
                class="q-pb-lg"
              >
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>
            </q-card-section>

            <q-card-actions
              align="right"
              class="text-primary"
            >
              <q-btn
                flat
                label="Cancel"
                v-close-popup
              />
              <q-btn
                flat
                label="Update word"
                @click="updateFlashcard"
              />
            </q-card-actions>
          </form>
        </q-card>
      </q-dialog>

      <!-- Dialog - Delete flashcard -->
      <q-dialog
        v-model="promptDeleteFlashcard"
        persistent
      >
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar
              icon="delete"
              color="primary"
              text-color="white"
            />
            <span
              class="q-ml-sm"
            >Do you really want to delete this flashcard?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="Cancel"
              color="primary"
              v-close-popup
            />
            <q-btn
              flat
              label="Delete flashcard"
              color="primary"
              @click="deleteFlashcard"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <div
        id="listToPrint"
        class="container"
      >
        <div class="container">
          <div 
            class="row text-center text-bold"
            v-for="flashcard in list.flashcards"
            :key="flashcard._id"
          >
            <div class="col-xs-6 q-pt-md q-pb-md">
              {{ flashcard.firstLanguage }}
            </div>
            <div class="col-xs-6 q-pt-md q-pb-md">
              {{ flashcard.secondLanguage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'PageList',
  async created() {
    await this.getList();
    this.chart = this.list.statistics.quizzes.map((a) => a.accuracy);
  },
  data: () => ({
    promptCreateFlashcard: false,
    promptUpdateFlashcard: false,
    promptDeleteFlashcard: false,
    flashcard: {},
    formCreateFlashcard: {
      firstLanguage: '',
      secondLanguage: '',
    },
    formUpdateFlashcard: {
      id: '',
      firstLanguage: '',
      secondLanguage: '',
    },
    formDeleteFlashcard: {
      id: '',
    },
    chart: [],
  }),
  validations: {
    formCreateFlashcard: {
      firstLanguage: {
        required,
      },
      secondLanguage: {
        required,
      },
    },
    formUpdateFlashcard: {
      firstLanguage: {
        required,
      },
      secondLanguage: {
        required,
      },
    },
  },
  methods: {
    openPromptCreateFlashcard() {
      this.promptCreateFlashcard = true;

      this.formCreateFlashcard = {
        firstLanguage: '',
        secondLanguage: '',
      };
    },
    openPromptUpdateFlashcard(flashcard) {
      this.promptUpdateFlashcard = true;

      this.formUpdateFlashcard = {
        id: flashcard._id,
        firstLanguage: flashcard.firstLanguage,
        secondLanguage: flashcard.secondLanguage,
      };
    },
    openPromptDeleteFlashcard(flashcard) {
      this.promptDeleteFlashcard = true;

      this.formDeleteFlashcard = {
        id: flashcard._id,
      };
    },
    async createFlashcard() {
      try {
        this.$v.formCreateFlashcard.$touch();

        if (this.$v.formCreateFlashcard.$error) {
          throw new Error('Please review fields again.');
        }

        const createFlashcardProcess = await this.$store.dispatch(
          'lists/createFlashcard',
          {
            listId: this.$route.params.id,
            firstLanguage: this.formCreateFlashcard.firstLanguage,
            secondLanguage: this.formCreateFlashcard.secondLanguage,
          },
        );

        this.formCreateFlashcard = {};
        this.promptCreateFlashcard = false;

        await this.getList();

        this.$v.formCreateFlashcard.$reset();

        this.$q.notify({
          message: createFlashcardProcess.message,
          color: 'positive',
        });
      } catch (e) {
        this.$q.notify({ message: e.message, color: 'negative' });
      }
    },
    async updateFlashcard() {
      try {
        this.$v.formUpdateFlashcard.$touch();

        if (this.$v.formUpdateFlashcard.$error) {
          throw new Error('Please review fields again.');
        }

        const updateFlashcardProcess = await this.$store.dispatch(
          'lists/updateFlashcard',
          {
            listId: this.$route.params.id,
            flashcardId: this.formUpdateFlashcard.id,
            firstLanguage: this.formUpdateFlashcard.firstLanguage,
            secondLanguage: this.formUpdateFlashcard.secondLanguage,
          },
        );

        this.word = {};
        this.promptUpdateFlashcard = false;

        this.formUpdateFlashcard = {};
        await this.getList();
        this.$v.formCreateFlashcard.$reset();

        this.$q.notify({
          message: updateFlashcardProcess.message,
          color: 'positive',
        });
      } catch (e) {
        this.$q.notify({ message: e.message, color: 'negative' });
      }
    },
    async deleteFlashcard() {
      try {
        const deleteFlashcardProcess = await this.$store.dispatch(
          'lists/deleteFlashcard',
          {
            listId: this.$route.params.id,
            flashcardId: this.formDeleteFlashcard.id,
          },
        );

        this.promptDeleteFlashcard = {};
        this.promptDeleteFlashcard = false;

        await this.getList();

        this.$q.notify({
          message: deleteFlashcardProcess.message,
          color: 'positive',
        });
      } catch (e) {
        this.$q.notify({ message: e.message, color: 'negative' });
      }
    },
    async getList() {
      try {
        const getListProcess = await this.$store.dispatch('lists/getList', {
          listId: this.$route.params.id,
        });

        this.$q.notify({ message: getListProcess.message, color: 'positive' });
      } catch (e) {
        this.$q.notify({ message: e.message, color: 'negative' });
      }
    },
    async getFlashcards() {
      try {
        const getFlashcardsProcess = await this.$store.dispatch(
          'flashcards/getFlashcards',
          {
            listId: this.$route.params.id,
          },
        );

        this.$q.notify({
          message: getFlashcardsProcess.message,
          color: 'positive',
        });
      } catch (e) {
        this.$q.notify({ message: e.message, color: 'negative' });
      }
    },
    printList() {
      try { 
      // window.print(); 

      this.$htmlToPaper('listToPrint');

      } catch(e) {
        console.log(e);
        this.$q.notify({ message: 'Something went wrong', color: 'negative' });
      }
    },
    viewQuiz() {
      if (this.list.flashcards.length === 0) {
        this.$q.notify({
          message: 'You do not have any flashcards',
          color: 'negative',
        });
      } else {
        this.$router.push(`/quiz/${this.list._id}`);
      }
    },
  },
  computed: {
    list() {
      return this.$store.getters['lists/list'];
    },
    listNumberOfAllCorrectAnswers() {
      return this.list.statistics.quizzes.reduce(
        (a, b) => a + (b['correctAnswers'] || 0),
        0,
      );
    },
    listNumberOfAllIncorrectAnswers() {
      return this.list.statistics.quizzes.reduce(
        (a, b) => a + (b['incorrectAnswers'] || 0),
        0,
      );
    },
    listAccuracy() {
      return parseFloat(
        (this.listNumberOfAllCorrectAnswers /
          (this.listNumberOfAllCorrectAnswers +
            this.listNumberOfAllIncorrectAnswers)) *
          100,
      ).toFixed(2);
    },
    flashcardNumberOfAllCorrectAnswers() {
      return (flashcard) => flashcard.statistics.correctAnswers;
    },
  },
};
</script>

<style lang="scss" scoped>

.card {
  &.informations {
    background: linear-gradient(to right, $dark, $primary);
  }
  &.flashcard {    
    background: linear-gradient(to right, $dark, $primary);
  }
}

.word {
  &.second-language {
    color: $primary !important;
  }
}

.button-action {
  position: absolute;
  top: 0;
  right: 0;
}

.list {
  .statistics {
    &.correct-answers {
      color: $positive;
    }
    &.incorrect-answers {
      color: $negative;
    }
    &.accuracy {
      color: $info;
    }
  }
}

.flashcard {
  .statistics {
    .badge {
      &.correct-answers {
        background-color: $positive;
      }
      &.incorrect-answers {
        background-color: $negative;
      }
      &.accuracy {
        background-color: $info;
      }
    }
  }
}

</style>
