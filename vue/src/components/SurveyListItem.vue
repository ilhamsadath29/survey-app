<template>
  <div class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
        <img :src="survey.image_url" alt="" class="w-full h-48 object-cover" />
        <h4 class="mt-4 text-lg font-bold">{{ survey.title }}</h4>
        <div v-html="survey.description" class="overflow-hidden flex-1"></div>

        <div class="flex justify-between items-center mt-3">
          <router-link :to="{name: 'SurveyView', params: {id: survey.id}}" 
            class="flex py-2 px-4 text-white border border-transparent text-sm rounded-md bg-indigo-600 hover:bg-indigo-700 
            focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </router-link>

          <div class="flex items-center">
            <a :href="`/view/survey/${survey.slug}`" target="_blank" 
              class="h-8
                w-8
                flex
                items-center
                justify-center
                rounded-full
                border border-transparent
                text-sm text-indigo-500
                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                </svg>
            </a>
            <button v-if="survey.id" type="button" @click="emit('delete', survey)" 
              class="h-8
                w-8
                flex
                items-center
                justify-center
                rounded-full
                border border-transparent
                text-sm text-red-500
                focus:ring-2 focus:ring-offset-2 focus:ring-red-500">

                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 -mt-1 inline-block" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
            </button>
          </div>
        </div>
      </div>
</template>

<script setup>
    const {survey} = defineProps({
        survey: Object
    })

    const emit = defineEmits(["delete"])
</script>

<style>

</style>