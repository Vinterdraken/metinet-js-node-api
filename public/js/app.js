var app = new Vue({
    el: '#app',
    data: {
        post: {}
    },
    created: function(){
        let vm = this;
        fetch('http://localhost:3000/api/post/').then((response) => {
            return response.json().then((json) => {
                vm.post = json;
            })
        })
    },
    methods:{
        deleteItem(post){
            axios
            .delete('http://localhost:3000/api/post/' + post._id, {
                headers: {
                    "Authorization": "azeazeaze",
                    "Content-Type": "text/json"
                }
            })
            .then(response => {
                return response.json().then(json => {
                    console.log('json: ', json);
                })
            })
        }
    }
});
