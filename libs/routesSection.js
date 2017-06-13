module.exports = {
    target: "",
    fn: (metadata) => (line) => {
            try {
            if(!line.startsWith('router.')) {
                throw new Error('Not required')
            }
            const tag = line.split("'")[1];
            if(tag.startsWith(`/`)) {
                this.target = tag;
                return `///HEADER#This be the header, yo
// This file is for ${this.target}
module.exports = {};
`
            }
            const data = tag.split(':');
            return `///DELIMITER#${metadata}#tag=${tag}#BEGIN# 
moldule.exports.${data[0]}_${data[1]}_${data[2]} = t => {
  const path='${this.target}/'
  t.default(path)
}
///DELIMITER#END#
`
        } catch(e) {
            return ''
        }
    }
};
