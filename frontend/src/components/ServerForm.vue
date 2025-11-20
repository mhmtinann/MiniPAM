<template>
  <div class="server-form">
    <h2>{{ isEditing ? 'Edit Server' : 'Add New Server' }}</h2>
    <form @submit.prevent="saveServer">
      <div class="form-group">
        <label for="name">Server Name</label>
        <input type="text" id="name" v-model="server.name" required>
      </div>

      <div class="form-group">
        <label for="host">Host</label>
        <input type="text" id="host" v-model="server.host" required>
      </div>

      <div class="form-group">
        <label for="port">Port</label>
        <input type="number" id="port" v-model="server.port" required>
      </div>

      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="server.username" required>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="server.password" required>
      </div>

      <div class="form-group">
        <label for="connectionType">Connection Type</label>
        <select id="connectionType" v-model="server.connectionType" required>
          <option value="SSH">SSH</option>
          <option value="RDP">RDP</option>
        </select>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="server.description"></textarea>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-primary">{{ isEditing ? 'Update' : 'Add' }} Server</button>
        <button type="button" class="btn-secondary" @click="$emit('cancel')">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ServerForm',
  props: {
    server: {
      type: Object,
      required: true
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    saveServer() {
      this.$emit('save', this.server);
    }
  }
}
</script>

<style scoped>
.server-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, select, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  height: 100px;
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn-primary, .btn-secondary {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
}

.btn-secondary {
  background-color: #f44336;
  color: white;
}
</style> 