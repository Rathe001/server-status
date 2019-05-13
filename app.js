class App {
  constructor(servers) {
    this.servers = servers;

    this.createServers(servers);
  }

  createServers(servers) {
    const rows = this.servers.reduce(
      (str, server, i) =>
        str +
        `<tr class="server-${i} pending"><td class="name">${server}</td><td class="ping"></td><td class="status"></td></tr>`,
      '',
    );

    document.querySelector('#servers').innerHTML = rows;

    this.updateServers();
  }

  updateServers() {
    const startTime = new Date().getTime();
    for (let i = 0; i < this.servers.length; i++) {
      this.request({ url: this.servers[i] })
        .then(rs => {
          document.querySelector(`.server-${i}`).className = `server-${i} success`;
          document.querySelector(`.server-${i} .ping`).innerHTML = `${new Date().getTime() -
            startTime}ms`;
          document.querySelector(`.server-${i} .status`).innerHTML = `${rs.status}`;
        })
        .catch(rs => {
          document.querySelector(`.server-${i}`).className = `server-${i} error`;
          document.querySelector(`.server-${i} .ping`).innerHTML = `${new Date().getTime() -
            startTime}ms`;
          document.querySelector(`.server-${i} .status`).innerHTML = `${rs.status}`;
        });
    }

    setTimeout(() => this.updateServers(), 15000);
  }

  request(obj) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(obj.method || 'GET', obj.url);
      if (obj.headers) {
        Object.keys(obj.headers).forEach(key => {
          xhr.setRequestHeader(key, obj.headers[key]);
        });
      }
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr);
        } else {
          reject(xhr);
        }
      };
      xhr.onerror = () => reject(xhr);
      xhr.send(obj.body);
    });
  }
}

const app = new App([
  'https://code.jquery.com/jquery-3.4.1.slim.min.js',
  'https://www.ceetus.com',
  'https://api.coinbase.com/v2/assets/info?filter=listed',
  'http://astigmapro.com/asdgasdgasdg.js',
  'http://astigmapro.com',
]);
