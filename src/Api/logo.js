import qs from 'qs'

function render (method, status, url, other) {
    if (status == 200) {
      return [
        `🚜%c ${method} %c ${status} %c ${url} %c ${other}`,
        "background:#35495e ; padding: 1px 0; border-radius: 3px 0 0 3px;  color: #fff",
        "background:#009688 ; padding: 1px 0; color: #fff",
        "background: transparent; border: 1px solid #009688 ; padding: 0px; border-radius: 0 3px 3px 0;  color: #000",
        "background:transparent; color: #90939975"
      ]
    } else {
      return [
        `🚒%c ${method} %c ${status} %c ${url} %c ${other}`,
        "background:#35495e ; padding: 1px 0; border-radius: 3px 0 0 3px;  color: #fff",
        "background:#E91E63 ; padding: 1px 0; color: #fff",
        "background: transparent; border: 1px solid #E91E63 ; padding: 0px; border-radius: 0 3px 3px 0;  color: #fff",
        "background:transparent; color: #90939975"
      ]
    }
}

function len(url, int) {
    if(!int) {
      return url
    }
    let intlen = int.toString().length
    let liurl = url.slice(url.indexOf(int) + intlen)

    return liurl
    // len(res.config.url,3000)
}
  
export default function (req, res) {
    console.groupCollapsed(...render(res.config.method.toUpperCase(), res.status, res.config.url, req.constructor.name))
    if (res.config) { // just axios maybe
      console.group('🍍 Request')
      console.log('📜 Headers', res.config.headers)
      console.log('📜 Params', qs.parse(res.config.params))
      if (res.config.data)
        console.log('📜 Body', qs.parse(res.config.data))
      console.groupEnd()
    }
    console.group('🍓 Response')
    console.log(res.status == 200 ? res.data || res.msg : res.msg || res.statusText || res)
    console.groupEnd()
    console.groupEnd()
}