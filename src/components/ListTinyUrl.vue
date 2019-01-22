<template>
  <div class="result">
    <ul>
      <li v-for="(item, index) in list" :key="index" :class="{ 'is-previous': index > 0}">
        <div class="item-info">
          <span class="item-tinyurl" :class="{grow: copied === item.tiny_url && index === 0 }">{{item.tiny_url}}</span>
          <a :href="item.url" target="_blanck">
            <span class="item-url">{{item.url}}</span>
          </a>
        </div>
        <div v-if="index === 0">
          <router-link :to="{ path: `/statistics/${item.tiny_id}` }">
            <span class="item-views">{{item.count}} requests</span>
          </router-link>
        </div>
        <button
          type="button"
          v-if="index === 0"
          v-clipboard:copy="item.tiny_url"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >Copy!</button>
      </li>
    </ul>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "ListTinyUrl",
  data() {
    return {
      listSize: 3,
      copied: ""
    };
  },
  computed: {
    list() {
      return store.state.urlList.slice(0, this.listSize);
    }
  },
  methods: {
    onCopy: function(event) {
      this.copied = event.text;
      setTimeout(() => {
        this.copied = "";
      }, 300);
    },
    onError: function() {
      alert("Failed to copy url");
    }
  }
};
</script>

<style lang="scss" scoped>
.result {
  width: 800px;

  ul {
    list-style: none;
    text-align: left;
  }

  ul li {
    display: flex;
    justify-content: left;
    padding: 20px;
  }

  ul li a {
    text-decoration: none;
    display: block;
  }

  ul li span {
    display: block;
  }

  ul li button {
    border: 1px solid #4992f0;
    border-radius: 5px;
    color: #4992f0;
    height: 30px;
    font-size: 15px;
    background-color: transparent;
    cursor: pointer;
  }
}

.item-url {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 500px;
}

.item-tinyurl {
  font-size: 20px;
  font-weight: bold;
  color: #202b36;
  transition: transform 1s;
}

.item-info {
  width: 90%;
}

.item-views {
  width: 120px;
  font-size: 14px;
  margin: 0 20px;
}

.grow {
  -webkit-transform: rotateX(360deg);
  -ms-transform: rotateX(360deg);
  transform: rotateX(360deg);
}

.is-previous {
  filter: alpha(opacity=20);
  opacity: 0.2;
}
</style>
