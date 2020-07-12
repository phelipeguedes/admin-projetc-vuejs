<template>
    <div class="category-admin">
        <b-form>
            <input type="hidden" id="category_id" v-model="category.id">

            <b-row>
                <b-col md="12" sm="12">
                    <b-form-group label="Nome" label-for="category_name">
                        <b-form-input type="text" v-model="category.name" :readonly="mode === 'remove'" placeholder="Informe o nome da categoria" required=""/>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="12" sm="12">
                    <b-form-group label="Categoria Principal" label-for="category_parentID">
                        <b-form-select v-if="mode ==='save'" :options="categories" v-model="category.parentID" id="category_parentID" placeholder="Selecione a categoria pai" required=""/>
                        <b-form-input v-else id="category_parentID" type="text" v-model="categorie.path" readonly/>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-button v-if="mode === 'save'" variant="primary" class="ml-3 mb-4" @click="save()">Salvar</b-button>
                <b-button v-if="mode === 'remove'" variant="danger" class="ml-3 mb-4" @click="remove()">Excluir</b-button>
                <b-button class="ml-3 mb-4" @click="reset()">Cancelar</b-button>
            </b-row>       
        </b-form>

        <b-table striped hover :items="categories" :fields="fields">
            <template v-slot:cell(actions)="data">
                
                <b-button class="mr-2" variant="warning" @click="loadCategory(data.item)">
                    <i class="fa fa-pencil"></i>
                </b-button>                

                <b-button class="mr-2" variant="danger" @click="loadCategory(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>

            </template>
        </b-table>
    </div>
</template>

<script>

import axios from 'axios'

export default {    
    name: 'categoryAdmin',
    
    data: function() {
        return {
            mode: 'save',
            category: {},
            categories: [],
            fields: [
                {key: 'id', sortable: true},                          
                {key: 'name', label: 'Categoria'},
                {key: 'path', label: 'Caminho'},
                {key: 'actions', label: 'Ações'}
            ]
        }
    },

    methods: {
        
        loadCategories() {
            const url = `http://localhost:3000/categories`

            axios.get(url)
                .then(res => {
                    this.categories = res.data.map(category => {
                        return { ...category, value: category.id, text: category.path }
                    })

                    console.log(this.categories)
            });
        },

        save() {
            const url = `http://localhost:3000/categories`
            const method = this.category.id ? 'put' : 'post'
            const id = this.category.id ? `/${this.category.id}` : ''
            
            axios[method](`${url}/${id}`, this.category).then(() => {
                alert(`Categoria ${id} salva com sucesso!`)                
                this.loadCategories()
            }).catch(this.showError)
        },

        loadCategory(category, mode='save') {
            this.mode = mode
            this.category = { ...category }
        },

        reset() {
            this.mode = 'save'
            this.category = {}
            this.loadCategories()
        },

        remove() {
            const url = `http://localhost:3000/categories`
            const id = this.category.id

            axios.delete(`${url}/${id}`).then(() => {
                alert(`Categoria ${id} removida com sucesso!`)
                this.loadCategories()
            }).catch(error => {
                alert(error)
            })
        },


    }, 

    // carrega as categorias ao iniciar a página
    mounted() {
        this.loadCategories()
    },
}
</script>

<style>
    
</style>