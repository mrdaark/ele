(function () {
    let page='';
    let divMain;

    const converter = new showdown.Converter();
    document.addEventListener('DOMContentLoaded',function () {
        
        divMain = document.querySelector('#main');

        if (window.location.hash==='' || window.location.hash==='#')
        {
            page = 'main';
        }
        else
        {
            page = window.location.hash.slice(1);
        }

        const getContent = (page) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'content/'+page+'.md', true);
            xhr.send();
    
            xhr.onreadystatechange = function() { // (3)
                if (xhr.readyState != 4) return;
              
                if (xhr.status != 200) {
                    divMain.innerHTML='Страница не найдена';
                } else {
                    divMain.innerHTML=converter.makeHtml(xhr.responseText);
                }
              }
        }
        getContent(page);

        window.addEventListener('hashchange',function () {
            page = (window.location.hash.slice(1)!=='') ? window.location.hash.slice(1): 'main';
            getContent(page);
        });
    })
})();