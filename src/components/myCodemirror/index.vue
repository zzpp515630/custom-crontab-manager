<template>
  <div class="codemirror">
    <textarea ref="code" v-model="content" name="code"></textarea>
  </div>
</template>

<script>
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/selection/active-line"; // 工具包:设置光标所在行高亮true/false
// 关键字变色
import CodeMirror from "codemirror/lib/codemirror"; // CodeMirror，必要
import "codemirror/lib/codemirror.css"; // css，必要
import "codemirror/theme/darcula.css";
// 模式
import "codemirror/mode/javascript/javascript"; // js的语法高亮，自行替换为你需要的语言
import "codemirror/mode/xml/xml";
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike";
// 提示
import "codemirror/addon/hint/show-hint"; // SQL提示
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/sql-hint";
import "codemirror/addon/hint/xml-hint";
import "codemirror/addon/hint/anyword-hint";
// 占位符
import "codemirror/addon/display/placeholder";
import { ref, watch, computed, onMounted } from "vue";
export default {
  name: "MyCodemirror",
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    // 是否禁用. true-禁用，false-不禁用
    disabled: {
      type: [Boolean],
      default: false,
    },
    // 自定义配置项
    options: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const code = ref(null);
    let myCodeMirror = null;
    const content = computed(() => {
      return props.modelValue;
    });
    const option = {
      mode: "xml",
      value: content.value,
      // theme: "3024-day",
      theme: "darcula",
      lineNumbers: true, // 使用行号
      lineWrapping: true,
      styleActiveLine: true, // 当前行背景高亮
      matchBrackets: true, // 匹配括号
      // hint: CodeMirror.hint.sql, // 提示
      hintOptions: {
        completeSingle: false,
      },
      ...props.options
    };
    // 代码提示
    function completeAfter (cm, pred) {
      // var cur = cm.getCursor();
      if (!pred || pred())
        setTimeout(function () {
          console.log(cm.state.completionActive)
          if (!cm.state.completionActive) {
            // // 输入字符是，将提示方法置为默认提示，则提示对应mode的关键字
            // cm.setOption("hintOptions", {
            //   completeSingle: false,
            // });
            cm.showHint({
              completeSingle: false,
            });
            console.log(cm)
            // cm.showHint();
          }
        }, 200);
      return CodeMirror.Pass;
    }
    option.extraKeys = {
      "Ctrl-/": "autocomplete",
      "'a'": completeAfter,
        "'b'": completeAfter,
        "'c'": completeAfter,
        "'d'": completeAfter,
        "'e'": completeAfter,
        "'f'": completeAfter,
        "'g'": completeAfter,
        "'h'": completeAfter,
        "'i'": completeAfter,
        "'j'": completeAfter,
        "'k'": completeAfter,
        "'l'": completeAfter,
        "'m'": completeAfter,
        "'n'": completeAfter,
        "'o'": completeAfter,
        "'p'": completeAfter,
        "'q'": completeAfter,
        "'r'": completeAfter,
        "'s'": completeAfter,
        "'t'": completeAfter,
        "'u'": completeAfter,
        "'v'": completeAfter,
        "'w'": completeAfter,
        "'x'": completeAfter,
        "'y'": completeAfter,
        "'z'": completeAfter,
        "'.'": completeAfter,
        "'A'": completeAfter,
        "'B'": completeAfter,
        "'C'": completeAfter,
        "'D'": completeAfter,
        "'E'": completeAfter,
        "'F'": completeAfter,
        "'G'": completeAfter,
        "'H'": completeAfter,
        "'I'": completeAfter,
        "'J'": completeAfter,
        "'K'": completeAfter,
        "'L'": completeAfter,
        "'M'": completeAfter,
        "'N'": completeAfter,
        "'O'": completeAfter,
        "'P'": completeAfter,
        "'Q'": completeAfter,
        "'R'": completeAfter,
        "'S'": completeAfter,
        "'T'": completeAfter,
        "'U'": completeAfter,
        "'V'": completeAfter,
        "'W'": completeAfter,
        "'X'": completeAfter,
        "'Y'": completeAfter,
        "'Z'": completeAfter,
    }
    console.log(option)
    // 挂载
    onMounted(() => {
      myCodeMirror = CodeMirror.fromTextArea(code.value, option);
      myCodeMirror.on("change", () => {
        emit("update:modelValue", myCodeMirror.getValue());
      });
    });
    watch(() => props.modelValue, (newValue) => {
      console.log("watch", props.modelValue);
      if (myCodeMirror && newValue !== myCodeMirror.getValue()) {
        myCodeMirror.setValue(newValue);
      }
    });
    console.log("1111", content.value);
    return { code, content };
  },
};
</script>

<style lang="scss" scoped>
.codemirror {
  height: 100%;
  min-height: 200px;
  ::v-deep {
    .CodeMirror,
    .CodeMirror-scroll{
      height: 100%;
      min-height: 200px;
    }
  }
}
</style>
