import httpClient from "./httpClient.js";

// const store = useStore(); 
const url = 'explications'

export const explicationsApi = {

  create(id, obj) {
    try {
      const resp = httpClient.post(`${url}/create`, {
        project_id: id,
        name: obj.name,
        square: Number(obj.square),
      })
      return resp
    } catch (err) {
      throw err
    }
  },

  add(data, id) {
    const formData = new FormData();
    formData.append("album_id", id)
    for( var i = 0; i < data.length; i++ ){
      let file = data[i];
      formData.append(`images[]`, file);
    }

    try {
      return httpClient({
        method: "post",
        url: `${url}/addImages`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(({data}) => {
        return data.data
      })
    } catch (err) {
      console.log(err)
    }
  },

  update(datas) {
    const formData = new FormData();
    formData.append("album_id", datas.id)
    formData.append("name", datas.name)
    formData.append("description", datas.description)

    try {
      return httpClient({
        method: "post",
        url: `${url}/update`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(({data}) => {
        return data.data
      })
    } catch (err) {
      console.log(err)
    }
  },

  del(id) {
    try {
      return httpClient.post(`${url}/delete`, {
        explication_id: id 
      }).then(({ data }) => {
        return data
      })
    } catch (err) {
      console.log(err)
    }
  },

}