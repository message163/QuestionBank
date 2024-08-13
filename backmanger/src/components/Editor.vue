<template>
    <div ref="divRef" style="height: 300px" />
</template>

<script setup lang="ts">
import { AiEditor } from "aieditor";
import "aieditor/dist/style.css"
import { onMounted, onUnmounted, ref, watch } from "vue";

const divRef = ref();
let aiEditor: AiEditor | null = null;

const props = defineProps<{
    modelValue: string
    placeholder?: string
}>()

const emit = defineEmits(['update:modelValue'])

watch(() => props.modelValue, () => {
    if (aiEditor) {
        aiEditor.setContent(props.modelValue)
    }
})

onMounted(() => {
    aiEditor = new AiEditor({
        element: divRef.value as Element,
        placeholder: props.placeholder || "点击输入内容...",
        content: props.modelValue,
        onChange: (content) => {
            emit('update:modelValue', content.getHtml())
        }
    })
})

onUnmounted(() => {
    aiEditor && aiEditor.destroy();
})
</script>