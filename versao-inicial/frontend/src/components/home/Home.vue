<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main=" Home" subTitle="Subtítulo"/>

        <div class="stats">
            <Stat title="Categorias" :value="stat.categories" icon="fa fa-folder" color="#d54d50" />
            <Stat title="Artigos" :value="stat.articles" icon="fa fa-file" color="#3bc480" /> 
            <Stat title="Usuários" :value="stat.users" icon="fa fa-users" color="#3282cd"/>
        </div>    
    </div>
</template>

<script>

import PageTitle from '../templates/PageTitle'
import apiBaseURL from '@/global'
import Stat from './Stat'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
    name: 'Home',
    components: { PageTitle, Stat },
    
    data: function() {
        return {
            stat: {}
        }
    },
    
    methods: {
        getStats() {
            axios.get(`${apiBaseURL}/stats`).then(res => {
                this.stat = res.data
            })
        }
    },
    mounted() {
        // ao carregar a página
        this.getStats()
    },
}
</script>

<style>
    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>