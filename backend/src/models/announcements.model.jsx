import { announcements } from '../store/announcments.store.js';

/**
 * @typedef {Object} Announcement
 * @property {string} id
 * @property {string} title
 * @property {string} message
 * @property {string} createdAt
 */

export const createAnnouncement = async (req, res) => {
  const { title, message } = req.body;
  try {
    if (!title || !message) {
      return res.status(404).json({
        message: "all filds are required"
      });
    }
    const Announcement = {
      title,
      message
    }
    await Announcement.save();
  } catch (error) {
    res.status(500).json({
      message: "something went wrong creating an announcement"
    })
  }

};

export const getAnnouncements = async (req, res) => {
  const id = req.params;
  try {
    if (!id) {
      res.status(404).json({
        message: "the announcement your getting  cannot be found"
      });
    }
    const announcement = await findMany({ id })
    res.status(200).json({ announcement });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong while getting announcement"
    })
  }

}

export const getAnnouncementById = async (rq, res) => {
  const id = res.params;
  try {
    if (!id) {
      return res.status(404).json({
         message: "error getting the announcement"
      });
    }
    const announcement = await announcements.findById({ id });
    res.status(200).json({ announcement });
    
  } catch (error) {
    res.status(500).json({
     message:"something went wrong getting an announcent"
    })
  }
}

export const deleteAnnouncement = async  (req, res) => {
  const id = req.params;
  try {
    if (!id) {
      res.status(404).json({
        message: "announcent your trying to create cannot be found"
      })
    }
    const announcement = await findByIdAndDelete({id})
  } catch (error) {
    res.status(500).json({
       message: "error deleting the announcement"
    })
  }
};
