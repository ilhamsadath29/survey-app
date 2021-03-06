<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h1
                    class="text-3xl font-bold text-gray-900"
                >{{ route.params.id ? model.title : "Create survey" }}</h1>

                <button
                    v-if="route.params.id"
                    type="button"
                    @click="deleteSurvey"
                    class="py-2 px-3 text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 -mt-1 inline-block"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    Delete Survey
                </button>
            </div>
        </template>

        <div v-if="surveyLoading" class="flex justify-center">Loading...</div>

        <form v-else @submit.prevent="saveSurvey" class="animate-fade-in-down">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <!-- survey fields -->
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <!-- Image -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Image</label>
                        <div class="mt-1 flex items-center">
                            <img
                                v-if="model.image_url"
                                :src="model.image_url"
                                :alt="model.title"
                                class="w-64 h-48 object-cover"
                            />
                            <span
                                v-else
                                class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gary-100"
                            >
                                <svg
                                    class="h-[80%] w-[80%] text-gray-300"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            </span>
                            <button
                                type="button"
                                class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <input
                                    type="file"
                                    @change="onImageChoose"
                                    class="absolute opacity-0 cursor-pointer"
                                />
                                Change
                            </button>
                        </div>
                    </div>
                    <!-- /Image -->

                    <!-- Title -->
                    <div>
                        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            v-model="model.title"
                            autocomplete="title"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <!-- /Title -->

                    <!-- Description -->
                    <div>
                        <label
                            for="description"
                            class="block text-sm font-medium text-gray-700"
                        >Description</label>
                        <div class="mt-1">
                            <textarea
                                id="description"
                                name="description"
                                v-model="model.description"
                                rows="3"
                                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            />
                        </div>
                        <!-- <p class="mt-2 text-sm text-gray-500">Brief description for your profile. URLs are hyperlinked.</p> -->
                    </div>
                    <!-- /Description -->

                    <!-- Expire Date -->
                    <div>
                        <label
                            for="expire_date"
                            class="block text-sm font-medium text-gray-700"
                        >Expire Date</label>
                        <input
                            type="date"
                            name="expire_date"
                            id="expire_date"
                            v-model="model.expire_date"
                            autocomplete="expire_date"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <!-- /Expire Date -->

                    <!-- Status -->
                    <div class="mt-4 space-y-4">
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input
                                    id="status"
                                    name="status"
                                    type="checkbox"
                                    v-model="model.status"
                                    class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                />
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="status" class="font-medium text-gray-700">Active</label>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /survey fields -->
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <h3 class="text-2xl font-semibold flex items-center justify-between">
                        Questions
                        <button
                            type="button"
                            @click="addQuestion()"
                            class="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4"
                                fill="none"
                                viewBox="0 0 20 20"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            &nbsp;Add Question
                        </button>
                    </h3>

                    <div
                        v-if="!model.questions"
                        class="text-center text-gray-600"
                    >You don't have any questions created</div>

                    <div v-for="(question, index) in model.questions" :key="question.id">
                        <QuestionEditor
                            :question="question"
                            :index="index"
                            @changeQuestion="changeQuestion"
                            @addQuestion="addQuestion"
                            @deleteQuestion="deleteQuestion"
                        />
                    </div>
                </div>

                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                        type="submit"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >Save</button>
                </div>
            </div>
        </form>
    </PageComponent>
</template>

<script setup>
import store from "../store";
import { ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { v4 as uuidv4 } from "uuid";
import PageComponent from "../components/PageComponent.vue";
import QuestionEditor from "../components/editor/QuestionEditor.vue";

const router = useRouter();
const route = useRoute();

const surveyLoading = computed(() => store.state.currentSurvey.loading);

let model = ref({
    title: "",
    status: false,
    description: null,
    image_url: null,
    expire_date: null,
    questions: [],
});

// Get current survey data
watch(
    () => store.state.currentSurvey.data,
    (newVal, oldVal) => {
        model.value = {
            ...JSON.parse(JSON.stringify(newVal)),
            status: newVal.status !== "draft",
        };
    }
);

// handle edit page
if (route.params.id) {
    store.dispatch("getSurvey", route.params.id);
}

function onImageChoose(ev) {
    const file = ev.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
        // for send_backend
        model.value.image = reader.result;

        // for display
        model.value.image_url = reader.result;
    };
    reader.readAsDataURL(file);
}

function addQuestion(index) {
    const newQuestion = {
        id: uuidv4(),
        type: "Text",
        question: "",
        description: null,
        data: {},
    };

    model.value.questions.splice(index, 0, newQuestion);
}

function deleteQuestion(question) {
    model.value.questions = model.value.questions.filter((q) => q !== question);
}

function changeQuestion(question) {
    model.value.questions = model.value.questions.map((q) => {
        if (q.id === question.id) {
            return JSON.parse(JSON.stringify(question));
        }
        return q;
    });
}

function saveSurvey() {
    store.dispatch("saveSurvey", model.value).then(({ data }) => {
        store.commit("notify", {
            type: "Success",
            message: "Survey was successfully updated.",
        });

        router.push({
            name: "SurveyView",
            params: { id: data.data.id },
        });
    });
}

function deleteSurvey() {
    if (confirm("Are you want delete this survey?")) {
        store
            .dispatch("deleteSurvey", route.params.id)
            .then(router.push({ name: "Surveys" }));
    }
}
</script>