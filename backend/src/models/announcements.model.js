import { announcements } from '../store/announcments.store.js';

/**
 * @typedef {Object} Announcement
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {{path:string, text:string}} link
 * @property {string} createdAt
 * @param {Announcement} announcement
 */

export const createAnnouncement = async (announcement) => {
  const { title, description, link, createdAt } = announcement;
  try {
    if (!title || !description || !link.path || !link.text) {
      return  {
        message: "all field are required"
      };
    }
    const Announcement = {
      title,
      description,
      link,
      createdAt 
    }
    announcements.push(Announcement);
    return {message:"Success!"}
  } catch (error) {
    console.error("Error adding announcement! ", error)
    return {
      message: "something went wrong creating"
    };
  } 
}

export const getAnnouncements = async () => {
  try {
    return {message:"Success!",announcements}
  } catch (error) {
    console.error("Error getting announcements: ", error)
    return  {message:"UNABLE TO get announcements"}
  }
}

export const getAnnouncementById = async (id) => {
    try {
      if (!id || isNaN(Number(id))) {
        return{
          message: "Invalid annoncement ID",
        };
      }
      const announcement = announcements.find((a) => a.id === Number(id));
      if (!announcement)
        return { message: "Announcement not found" };
      return{ announcement };
    } catch (error) {
      console.error("Error getting announcement: ", error);
      return {
        message: "something went wrong while getting announcement",
      };
    }
}

export const deleteAnnouncement = async  (id) => {
 
  try {
    if (!id || isNaN(Number(id)) ) {
      return {
        message: "announcent your trying to create cannot be found"
      }
    }
    const index = announcements.findIndex(a => a.id === Number(id))
    announcements.splice(index, 1);
    return {
      message: "announcent deleted successfully.."
    };
  } catch (error) {
    return{
       message: "error deleting the announcement"
    }
  }
};
