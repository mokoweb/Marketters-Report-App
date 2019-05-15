<template>
    <div>
        <h1>The User Page</h1>
        <hr>
        <button @click="navigateToUser" class="btn btn-primary">Add User</button>
        <hr>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        methods: {
            navigateToUser() {
                this.$router.push({ name: 'add-user' });
            }
        }
    }
</script>