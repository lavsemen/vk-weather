<template>
  <div class="home__search">
    <input
      type="text"
      placeholder="Search..."
      v-model.trim="search"
      ref="input"
      @keyup.enter="$emit('action', search)"
    />
    <button class="home__search-btn" @click="$emit('action', search)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-search"
        viewBox="0 0 16 16"
      >
        <path
          d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
        />
      </svg>
    </button>
    <button
      @click="voiceInput"
      class="home__button"
      :class="voiceActive ? 'active' : ''"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        class="bi bi-mic"
        viewBox="0 0 16 16"
      >
        <path
          d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"
        />
        <path
          d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"
        />
      </svg>
      <div class="home__button-circle"></div>
    </button>
  </div>
</template>

<script>
import { onUpdated, ref } from "vue";
export default {
  emits: ["voiceAction", "action", 'startVoice'],
  props: {
    voiceActive: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, context) {
    const search = ref("");

    const voiceInput = (event) => {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const SpeechGrammarList =
        window.SpeechGrammarList || window.webkitSpeechGrammarList;
      const SpeechRecognitionEvent =
        window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

      const recognition = new SpeechRecognition();
      recognition.start();

      recognition.onaudiostart = () => {
        context.emit("voiceAction", {voiceActive: true, searchInput: null})
      };
      recognition.onresult = async (e) => {
        const value = await e.results[0][0].transcript
        search.value = value
        context.emit("voiceAction", {voiceActive: false, searchInput: value})
      };
    };
    
    return {
      search,
      voiceInput
    };
  },
};
</script>
