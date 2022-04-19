<template>
    <span>
        <div class="flex justify-between items-center">
            <h3 class="text-lg font-bold">
                {{ index + 1 }}. {{ model.question }}
            </h3>

            <div class="flex items-center">
                <!-- Add new question -->
                    <button type="button" @click="addQuestion()" class="flex items-center text-sm py-1 px-4 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 20 20" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        &nbsp;Add 
                    </button>
                <!-- /Add new question -->

                <!-- Delete question -->
                    <button type="button" @click="deleteQuestion()" class="flex items-center text-xs py-1 px-4 rounded-sm border border-transparent text-red-500 hover:border-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                        &nbsp;Delete 
                    </button>
                <!-- /Delete question -->

            </div>
        </div>
        <div class="grid gap-3 grid-cols-12">
            <!-- Question -->
            <div class="mt-3 col-span-9">
                <label :for="'question_text_'+model.data" class="block text-sm font-medium text-gray-700">
                    Question Text
                </label>
                <input type="text" :name="'question_text_'+model.data" v-model="model.question" :id="'question_text_'+model.data" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            <!-- /Question -->


            <!-- Question type -->
            <div class="mt-3 col-span-3">
                <label for="question_type" class="block text-sm font-medium text-gray-700">
                    Question Type
                </label>
                <select id="question_type" name="question_type" v-model="model.type" @changeQuestion="typeChange" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    <option v-for="type in questionTypes" :key="type" :value="type">{{ upperCaseFirst(type) }}</option>
                </select>
            </div>
            <!-- /Question type -->

        </div>
        
        <!-- Question Description -->
        <div class="mt-3 col-span-9">
            <label for="question_description" class="block text-sm font-medium text-gray-700"> Question Description </label>
            <div class="mt-1">
                <textarea id="question_description" name="question_description" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" />
            </div>
                <!-- <p class="mt-2 text-sm text-gray-500">Brief description for your profile. URLs are hyperlinked.</p> -->
        </div>
        <!-- /Question type -->

        <hr class="my-4">
    </span>
</template>

<script setup>
import { ref } from "@vue/reactivity";

    const props = defineProps({
        question: Object,
        index: Number,
    });

    const emit = defineEmits(["changeQuestion", "addQuestion", "editQuestion"]);

    const model = ref(JSON.parse(JSON.stringify(props.question)));
</script>

<style>

</style>