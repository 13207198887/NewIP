var b = function (a, b) {
    for (var d = 0; d < b.length - 2; d += 3) {
        var c = b.charAt(d + 2),
            c = "a" <= c ? c.charCodeAt(0) - 87 : Number(c),
            c = "+" == b.charAt(d + 1) ? a >>> c : a << c;
        a = "+" == b.charAt(d) ? a + c & 4294967295 : a ^ c
    }
    return a
}

var tk =  function (a,TKK) {
    for (var e = TKK.split("."), h = Number(e[0]) || 0, g = [], d = 0, f = 0; f < a.length; f++) {
        var c = a.charCodeAt(f);
        128 > c ? g[d++] = c : (2048 > c ? g[d++] = c >> 6 | 192 : (55296 == (c & 64512) && f + 1 < a.length && 56320 == (a.charCodeAt(f + 1) & 64512) ? (c = 65536 + ((c & 1023) << 10) + (a.charCodeAt(++f) & 1023), g[d++] = c >> 18 | 240, g[d++] = c >> 12 & 63 | 128) : g[d++] = c >> 12 | 224, g[d++] = c >> 6 & 63 | 128), g[d++] = c & 63 | 128)
    }
    a = h;
    for (d = 0; d < g.length; d++) a += g[d], a = b(a, "+-a^+6");
    a = b(a, "+-3^+b+-f");
    a ^= Number(e[1]) || 0;
    0 > a && (a = (a & 2147483647) + 2147483648);
    a %= 1E6;
    return a.toString() + "." + (a ^ h)
}

var TKK = ((function() {
	var a = 3877879856;
	var b = -3171490291;
	return 424109 + '.' + (a + b)
})());

const vm = new Vue({
    el: '#app',
    data: {
        output: '',
        input:'',
        result:'',
    },
    mounted() {
        // axios.post("http://localhost:5000/api/v1.0/getstring",{
        //     params : { //请求参数  
        //         id : this.input 
        //     }  
        // })
        // .then(response => {
        //     this.results = response.data.tasks
        //     console.log(this.results)
        // })
    },
    methods:{
        getresult:function(){
            axios.get("http://localhost:5000/api/v1.0/getstring/"+this.input)
            .then(response => {
                this.output = response.data.tasks
                console.log(this.output)
                //console.log(this.results)
            })
       // console.log(this.input)
    },
    googleapi:function(){
        
        var sourceLang = "en";
        var targetLang = "zh-CN";
        const data = {
            'sl': sourceLang,
            'tl': targetLang,
            'q': "hello world!",
        }
        
        var mytk = tk(this.output,TKK);
        // const url = "http://localhost:7890/translate_a/single"
        //  + "?client=at&dt=t&dt=ld&dt=qca&dt=rm&dt=bd&dj=1&hl=" + targetLang + "&ie=UTF-8"
        //  + "&oe=UTF-8&inputm=2&otf=2&iid=1dd3b944-fa62-4b55-b330-74909a99969e&q="+"hello world" ;
        const url ="http://localhost:7890/translate_a/single?client=t&sl=en&tl=zh-CN&hl=zh-CN&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&source=bh&ssel=0&tsel=0&kc=1&tk="+mytk+"&q="+this.output;

        // axios({
        //     method:'get',
        //     url:url,
        //     encoding:'UTF-8',
        //     headers:{
        //         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        //         "Access-Control-Allow-Origin":"*",
        //         //"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36",
        //         //"cookie":" _ga=GA1.3.1572769143.1493796876; _gid=GA1.3.307588316.1526377910; 1P_JAR=2018-5-20-1; NID=130=SL4GjzCfYsOMre8ClbiLYyDQs5ZnbABU5OM_Jo3JLli9d0SyZ-JZhUvW14OCzsFSvgIcRd8OtRDir6TjUyGu9PVKmjg1QoVQY9U7ksAUGscsZYVBUXktRhpymEgmlPMqS-P8Vy1fv265Tg"
        //         //"Access-Control-Allow-Headers":"X-Requested-With, Content-Type, Accept",
        //        // "Access-Control-Allow-Methods":"GET,POST",
        //         //'User-Agent': 'AndroidTranslate/5.3.0.RC02.130475354-53000263 5.1 phone TRANSLATE_OPM5_TEST_1',
        //     },
        //     withCredentials:true,
        //    // data:data,
        //     //json:true,
        // }).then(function(json){
        //     console.log(json)
        // })
        console.log('test')
        axios.get(url)
        .then(response => {
            //this.output = response.data.tasks
            //console.log('test google')
            this.result = '';
            var data = response.data[0];
            console.log(data)
            for(var i = 0;i<data.length;i++)
            {
                if(data[i][0]){
                    this.result += data[i][0];
                }else{
                    break;
                }
                
            }
            //this.result = response.data[0][0][0]
            //console.log(response.data[0][0][0])
        })
    }
   },
   watch: {  
    input: {  
        handler: function() {
            this.output = ''
            for(var i=0;i<this.input.length;i++)
            {
                if( "!" < this.input[i] && this.input[i] < "~" && this.input[i] != '\n'){
                    this.output += this.input[i];
                }else{
                    this.output += " ";
                }
                
                //console.log(this.input[i])
            }
            //console.log(this.input)  
            // axios.get("http://localhost:5000/api/v1.0/getstring/"+this.input)
            // .then(response => {
            //     this.output = response.data.tasks
            //     //console.log(this.output)
            //     //console.log(this.results)
            // })
        },  
        deep: true  
    },
   output:{
       handler:function(){
           this.googleapi()
       }
   }  
  }  
});