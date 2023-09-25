import { createStore } from "vuex";
import sourceData from "@/data.json";
import { findById, upsert } from "@/helpers";

export default createStore({
  state: {
    ...sourceData,
    authId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2'
  },
  actions: {
    createPost (context, post) {
      post.id = "anys" + Math.floor(Math.random());
      post.userId = context.state.authId;
      post.publishedAt = Math.floor(Date.now() / 1000);
      context.commit("setPost", post);
      context.commit("setPostToThread", {
        childId: post.id,
        parentId: post.threadId,
      });
      context.commit("setContributorToThread", { childId: this.state.authId, parentId: post.threadId });
    },
    async createThread ({ commit, state, dispatch }, { text, title, forumId }) {
      const id = "anys" + Math.floor(Math.random());
      const userId = state.authId;
      const publishedAt = Math.floor(Date.now() / 1000);
      const thread = {
        forumId,
        title,
        publishedAt,
        userId,
        id
      }
      commit("setThread", thread);
      commit("setThreadtoForum", { parentId: forumId, childId: id });
      commit("setThreadtoUser", { parentId: userId, childId: id });
      dispatch("createPost", { text, threadId: id });
      return findById(state.threads, id);
    },
    async updateThread ({ commit, state }, { title, text, id }) {
      const thread = findById(state.threads, id);
      const post = findById(state.posts, thread.posts[0]);
      const newThread = { ...thread, title };
      const newPost = { ...post, text };
      commit("setThread", newThread);
      commit("setPost", newPost);
      return newThread;
    },
    updateUser (context, user) {
      console.log(user)
      context.commit("setUser", { user, userId: user.id });
    },
  },
  getters: {
    authUser (state, getters) {
      return getters.user(state.authId);
    },
    user: state => {
      return (id) => {
        const user = findById(state.users, id);
        return {
          ...user,
          get posts () {
            return state.posts.filter((post) => post.userId === user.id);
          },
          get postsCount () {
            return this.posts.length;
          },
          get threads () {
            return state.threads.filter((thread) => thread.userId === user.id);
          },
          get threadsCount () {
            return this.threads.length;
          },
        }
      }
    },
    thread: state => {
      return (id) => {
        const thread = findById(state.threads, id);
        return {
          ...thread,
          get author () {
            return findById(state.users, this.userId);
          },
          get repliesCount () {
            return thread.posts.length - 1;
          },
          get contributorsCount () {
            return thread.contributors.length;
          },
        }
      }
    }
  },
  mutations: {
    setPost (state, post) {
      upsert(state.posts, post);
    },
    setThread (state, thread) {
      upsert(state.threads, thread);
    },
    setUser (state, { user, userId }) {
      console.log('from setUser')
      const userIndex = findById(state.users, userId);
      state.users[userIndex] = user;
      console.log(state.users[userIndex])
    },
    setPostToThread: appendChildToParentMutation({ parent: "threads", child: "posts" }),
    setThreadtoForum: appendChildToParentMutation({ parent: "forums", child: "threads" }),
    setThreadtoUser: appendChildToParentMutation({ parent: "users", child: "threads" }),
    setContributorToThread: appendChildToParentMutation({ parent: "threads", child: "contributors" }),
  },
});

function appendChildToParentMutation ({ parent, child }) {
  return (state, { parentId, childId }) => {
    const resource = findById(state[parent], parentId);
    resource[child] = resource[child] || [];
    if (!resource[child].includes(childId)) {
      resource[child].push(childId);
    }
  }
}
