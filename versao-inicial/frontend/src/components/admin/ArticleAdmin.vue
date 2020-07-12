<template>
    <div class="article-admin">
        <b-form>
            <input type="hidden" v-model="article.id">

            <b-row>
                <b-col md="12" sm="12">
                    <b-form-group label="Nome" label-for="article_name">
                        <b-form-input type="text" id="article_name" v-model="article.name" :readonly="mode === 'remove'"/>
                    </b-form-group>
                </b-col>

                <b-col md="12" sm="12">
                    <b-form-group label="Descrição" label-for="article_description">
                        <b-form-input type="text" id="article_description" v-model="article.description" :readonly="mode === 'remove'"/>
                    </b-form-group>
                </b-col>

                <b-col md="12" sm="12">
                    <b-form-group label="Imagem (URL)" label-for="article_img_url">
                        <b-form-input type="text" id="article_img_url" v-model="article.imgURL" :readonly="mode === 'remove'"/>
                    </b-form-group>
                </b-col>

                <b-col md="12" sm="12">
                    <b-form-group label="Categoria" label-for="article_categoryID">
                        <b-form-select :options="categories" v-model="article.categoryID" :readonly="mode === 'remove'"/>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="12" sm="12">
                    <b-form-group label="Autor">
                        <b-form-select :options="users" v-model="article.userId" placeholder="Selecione o id do usuário" required/>
                    </b-form-group>
                </b-col>   
            </b-row>

            <b-form-group label="Conteúdo" label-for="article_content">
                <VueEditor v-model="article.content" placeholder="Insira o conteúdo do artigo..."></VueEditor>
            </b-form-group>
            
            <b-row>
                <b-button variant="primary" v-if="mode === 'save'" class="ml-3 mb-4"  @click="save()">Salvar</b-button>
                <b-button variant="danger" v-if="mode === 'remove'" class="ml-3 mb-4" @click="remove()">Excluir</b-button>
                <b-button class="ml-3 mb-4" @click="reset()">Cancelar</b-button>
            </b-row>
        
        </b-form>

        <hr>

        <b-table striped hover :items="articles" :fields="fields">
            <template v-slot:cell(actions)="data">
                
                <b-button class="mr-2" variant="warning" @click="loadArticle(data.item)">
                    <i class="fa fa-pencil"></i>
                </b-button>

                <b-button class="mr-2" variant="danger" @click="removeArticle(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>

            </template>
        </b-table>
    </div>
</template>

<script>

import axios from 'axios'
import { VueEditor } from 'vue2-editor'
 
export default {
    name: 'ArticleAdmin',
    components: { VueEditor },
    data: function() {
        return { 
            mode: 'save',
            article: {},
            articles: [],
            categories: [],
            users: [],
            page: 1,
            limit: 0,
            count: 0,
            fields: [
                { key:'id', label:'Id', sortable:true },
                { key:'name', label: 'Nome' },
                { key:'description', label: 'Descrição' },
                { key:'actions', label:'Ações' }
            ]
        }
    },

    methods: {
        loadArticles() {
            const url = `http://localhost:3000/articles`

            axios.get(url).then(res => {
                this.articles = res.data
                console.log(res)
                console.log(this.articles)                
            });
        },

        save() {
            const url = `http://localhost:3000/articles`
            const method = this.article.id ? 'put' : 'post'
            const id = this.article.id ? `/${this.article.id}` : ''

            axios[method](`${url}/${id}`, this.article).then(() => {
                alert('Artigo salvo com sucesso!')
                this.loadArticles()
            }).catch(this.showError)
        },

        loadArticle(article, mode='save') {
            this.mode = mode
            this.article = { ...article }

            // const url = `http://localhost:3000/articles`
            // axios.get(`${url}/${article.id}`).then(res => {
            //     this.article = res.data
            // })
        },

        loadCategories() {
            const url = `http://localhost:3000/categories`

            axios.get(url).then(res => {
                this.categories = res.data.map(category => {
                   console.log(res)
                   return { value: category.id, text: category.name }
                });
            });
        },

        loadUsers() {
            const url = `http://localhost:3000/users`

            axios.get(url).then(res => {
                this.users = res.data.map(user => {
                    console.log(res)
                    console.log(this.users)
                    return { value: user.id, text: `${user.name} - ${user.email}` }
                });
            });
        }
    }, 
    mounted() {
        this.loadArticles()
        this.loadArticle()
        this.loadCategories()
        this.loadUsers()
    },
}
</script>

<style>
    table th, td {
        text-align: center;
    }
</style>