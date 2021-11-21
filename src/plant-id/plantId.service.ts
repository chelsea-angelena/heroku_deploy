import { Injectable } from '@nestjs/common';
import axios from 'axios'

@Injectable()
export class PlantIdService {
  async identify(body) {
    let files = []
    files.push(body.data)

    const sendData = {
      api_key: 'Wv5YK9mlwd9bipqvyUsijKI89Ai7KWrOxRYlapNrOwtHq0KMTk',
      images: files,
      modifiers: ["crops_fast", "similar_images", "health_all"],
      plant_language: "en",
      plant_details: ["common_names",
        "url",
        "wiki_description",
        "taxonomy",
        "synonyms"]
    };

    if (files.length > 0) {
      return await axios.post('https://api.plant.id/v2/identify', sendData).then(res => {
        return res.data
      }).catch(error => {
        console.error('Error: ', error)
        return error
      })
    }
  }

}