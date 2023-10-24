export default class FetchUtils {
  static getGETConfig(signal?: AbortSignal): RequestInit {
    return {
      headers: this.getHeaders(),
      mode: "cors",
      redirect: "manual",
      signal: signal,
    };
  }


  private static getHeaders() {
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const csrfCookie = this._getXSRFToken();
    if(csrfCookie) {
      headers.append("X-XSRF-TOKEN", csrfCookie);
    }
    return headers;
  }

  private static _getXSRFToken() {
    const help = document.cookie.match(new RegExp("(^|;)\\s*" + "XSRF-TOKEN" + "\\s*=\\s*([^;]+)"));
    return (help ? help.pop() : "") as string;
  }
}
