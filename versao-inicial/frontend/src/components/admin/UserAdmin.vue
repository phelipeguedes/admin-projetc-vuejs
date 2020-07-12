<template>
    <div class="user-admin"> 
        <b-form>
            <input type="hidden" v-model="user.id" id="user_id">
        
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome" label-for="user_name">
                        <b-form-input :readonly="mode === 'remove'" id="user_name" type="text" v-model="user.name" placeholder="Informe o nome do usuário(a)" required />                    
                    </b-form-group>
                </b-col>

                <b-col md="6" sm="12">
                    <b-form-group label="Email" label-for="email">
                        <b-form-input :readonly="mode === 'remove'" id="email" type="email" v-model="user.email" placeholder="Informe o email" required />                    
                    </b-form-group>
                </b-col>            
            </b-row>

            <b-row>
                <b-col md="6" sm="12" v-show="mode === 'save'">
                    <b-form-group label="Password" label-for="password">
                        <b-form-input id="password" type="password" v-model="user.password" placeholder="Digite uma senha" required />
                    </b-form-group>
                </b-col>

                <b-col md="6" sm="12" v-show="mode === 'save'">
                    <b-form-group label="Confirm Password" label-for="confirm_password">
                        <b-form-input id="confirm_password" type="password" v-model="user.confirmPassword" placeholder="Digite a senha novamente" required />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-form-checkbox v-show="mode === 'save'" id="user_admin" v-model="user.admin" class="mt-3 mb-3">Administrador</b-form-checkbox>

            <b-row>
                <b-button variant="primary" class="ml-3 mb-4" v-if="mode === 'save'" @click="save()">Salvar</b-button>
                <b-button variant="danger" class="ml-3 mb-4" v-if="mode === 'remove'" @click="remove()">Excluir</b-button>
                <b-button class="ml-3 mb-4" @click="reset()">Cancelar</b-button>
            </b-row>
        </b-form>

        <b-table striped hover :items="users" :fields="fields">
            <template v-slot:cell(actions)="data">
                
                <b-button class="mr-2" variant="warning" @click="loadUser(data.item)">
                    <i class="fa fa-pencil"></i> 
                </b-button>
                
                <b-button class="mr-2" variant="danger" @click="loadUser(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>

            </template>
        </b-table>
    </div>
</template>

<script>

//import apiBaseURL from "@/global";
import axios from 'axios';

export default {
    name: 'UserAdmin',
    
    data: function() {
        return {
            mode: 'save',
            user: {},
            users: [],
            fields: [
                {key: 'id', label: 'Id', sortable: true},
                {key: 'name', label: 'Name', sortable: true},
                {key: 'email', label: 'Email'},
                {key: 'username', label: 'Username'},
                {key: 'address.city', label: 'Address'},
                {key: 'actions', label: 'Ações'}
            ]
        }
    },

    methods: {

        loadUsers() {  
            const url = `http://localhost:3000/users`

            axios.get(url)
                .then(res => {
                    console.log(this.users)
                    this.users = res.data
            });
        },

        save() {
            const url = `http://localhost:3000`
            const method = this.user.id ? 'put' : 'post'
            const id = this.user.id ? `/${this.user.id}` : ''
            
            axios[method](`${url}/users/${id}`, this.user)
                .then(() => {
                    alert(`Usuário Salvo com Sucesso! ${id}`)
                    this.loadUsers()
                }).catch(this.showError)
        },

        reset() {
            this.mode = 'save'
            this.user = {}
            this.loadUsers()
        },

        remove() {
            const url = `http://localhost:3000`
            const id = this.user.id
            
            axios.delete(`${url}/users/${id}`)
                .then(() => {
                    alert('Usuário removido com sucesso!')
                    this.loadUsers()
                }).catch(this.showError)
        },

        loadUser(user, mode='save') {
            this.mode = mode
            // copiando os valores de this.user p/ user
            this.user = { ...user }
        },

        showError() {
            return alert('Erro!')
        }

    },
    // ao carregar a página
    mounted() {
        this.loadUsers();
    },
}
</script>

<style>
    
</style>