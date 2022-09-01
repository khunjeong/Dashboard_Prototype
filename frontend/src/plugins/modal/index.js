import Vue from "vue";
import Modal from "./components/root.vue";
import "./scss/modal.scss";
// import { i18n } from './../i18n';

const AnimationTime = 200;

const CreateRootModal = () => {
  const rootElement = document.createElement("div");
  rootElement.id = "root-modal";
  document.body.appendChild(rootElement);
  const rootModal = new Vue({
    el: "#root-modal",
    render: (h) => h(Modal),
  });
  return rootModal;
};

const Plugin = {
  install: function (Vue, opts) {
    console.log("[Plugin] modal install");
    if (this.installed) {
      return;
    }
    const rootModal = CreateRootModal();
    Vue.prototype.$modal = {
      /**
       *
       * @param {any} component
       * @param {any} props
       * @param {string} animation
       * @param {Function} callback
       */
      open: function (component, props, animation, callback) {
        return new Promise((resolve) => {
          const componentClass = Vue.extend(component);
          const instance = new componentClass({
            propsData: props,
            // i18n: i18n
          });
          if (callback !== undefined) {
            callback(instance);
          }
          // 모달 생성
          this.activeIndex++;
          instance["modalIndex"] = this.activeIndex;
          // 모달 생성 애니메니션
          if (typeof animation === "string" && animation !== "") {
            instance["modalAnimation"] = animation;
            rootModal.$el.appendChild(instance.$mount().$el);
            this.refs.push(instance);
            const content =
              instance.$el.getElementsByClassName("modal-content")[0];
            content.classList.add(`modal-${animation}-enter-active`);
            content.classList.add(`modal-${animation}-enter-active-to`);
            setTimeout(() => {
              content.classList.remove(`modal-${animation}-enter-active-to`);
            }, 0);
            setTimeout(() => {
              content.classList.remove(`modal-${animation}-enter-active`);
            }, AnimationTime);
            // this.refs.push(instance);
          } else {
            instance["modalAnimation"] = "";
            rootModal.$el.appendChild(instance.$mount().$el);
            this.refs.push(instance);
          }
          // 모달 삭제
          instance["destroy"] = (res) => {
            const destroy = (res) => {
              this.activeIndex--;
              this.activeIndex = Math.max(this.activeIndex, 0);
              instance.$destroy();
              // vue node is destroy but dom is not destroyed
              instance.$el.parentNode.removeChild(instance.$el);
              const idx = this.refs.indexOf(instance);
              if (idx > -1) {
                this.refs.splice(idx, 1);
              }
              // can window back when no modal open
              if (rootModal.$el.children.length == 0) {
                window.onpopstate = () => {
                  console.log("뒤로가기2");
                  history.go(-1);
                  window.onpopstate = () => {};
                };
              }
              resolve(res);
            };
            const animationkey = instance["modalAnimation"];
            switch (animationkey) {
              case "":
                destroy(res);
                break;
              default:
                const content =
                  instance.$el.getElementsByClassName("modal-content")[0];
                const className = `modal-${animationkey}-leave-active`;
                content.classList.add(className);
                setTimeout(() => {
                  destroy(res);
                }, AnimationTime);
                break;
            }
          };

          // 뒤로가기
          if (rootModal.$el.children.length > 0) {
            history.pushState(null, null, location.href);
            // 두번 불린다.
            console.log("히스토리", history);
            window.onpopstate = function () {
              console.log("뒤로가기");
              history.go(1);
              const lastInstance = this.refs.pop();
              if (lastInstance) {
                lastInstance.destroy();
              }
            }.bind(this);
          }
        });
      },
      activeIndex: 0,
      refs: [],
    };
  },
};

Vue.use(Plugin);
