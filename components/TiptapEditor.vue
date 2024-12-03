<template>
  <div class="tiptap-editor">
    <div v-if="editor" class="tiptap-toolbar">
      <!-- Text Formatting -->
      <ButtonGroup>
        <Button
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          Bold
        </Button>
        <Button
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          Italic
        </Button>
        <Button
          @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
        >
          Strikethrough
        </Button>
      </ButtonGroup>

      <!-- Headings -->
      <ButtonGroup>
        <Button
          v-for="level in 6"
          :key="level"
          @click="editor.chain().focus().toggleHeading({ level }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level }) }"
        >
          H{{ level }}
        </Button>
      </ButtonGroup>

      <!-- Lists -->
      <ButtonGroup>
        <Button
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
        >
          Bullet List
        </Button>
        <Button
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
        >
          Ordered List
        </Button>
      </ButtonGroup>

      <!-- Code & Block -->
      <ButtonGroup>
        <Button
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'is-active': editor.isActive('codeBlock') }"
        >
          Code Block
        </Button>
        <Button
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }"
        >
          Blockquote
        </Button>
      </ButtonGroup>

      <!-- Undo & Redo -->
      <ButtonGroup>
        <Button
          @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().chain().focus().undo().run()"
        >
          Undo
        </Button>
        <Button
          @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().chain().focus().redo().run()"
        >
          Redo
        </Button>
      </ButtonGroup>
    </div>

    <!-- Writing Area -->
    <div class="tiptap-content">
      <TiptapEditorContent :editor="editor" />
    </div>
  </div>
</template>

<script setup>
import { useEditor } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';

const editor = useEditor({
  extensions: [StarterKit],
  content: '<p>Start editing your content here...</p>',
  editorProps: {
    attributes: {
      class:
        'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none',
    },
  },
});

onBeforeUnmount(() => {
  editor?.destroy();
});
</script>

<style scoped>
.tiptap-editor {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 1rem;
}

.tiptap-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #d1d5db;
  padding-bottom: 0.5rem;
}

.tiptap-content {
  min-height: 200px;
  max-height: 600px;
  overflow-y: auto;
}

.is-active {
  font-weight: bold;
  color: #2563eb;
}
</style>
