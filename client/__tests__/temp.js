import { getEmotionPath, getEmotion, getClothesPath, getClothes } from './AppearanceService';
import * as PointsService from './PointsService';
import * as Resources from '../constants/resources';

jest.mock('./PointsService', () => ({
  getPointInfo: jest.fn(),
  getQualityPoints: jest.fn()
}));

jest.mock('../constants/resources', () => ({
  emotions: {
    sad_face: 'path/to/sad_face.png',
    neutral_face: 'path/to/neutral_face.png',
    happy_face: 'path/to/happy_face.png',
  },
  tops: {
    pierson_tshirt: 'path/to/pierson_tshirt.png'
  },
  bottoms: {
    medium_jeans: 'path/to/medium_jeans.png'
  },
  accessories: {
    black_sunglasses: 'path/to/black_sunglasses.png'
  }
}));

describe('AppearanceService', () => {
  describe('getEmotion', () => {
    it('should return the correct emotion value', async () => {
      PointsService.getPointInfo.mockResolvedValue({
        wellness_points: 70
      });
      PointsService.getQualityPoints.mockReturnValue({
        wellness_points: 70
      });

      const emotion = await getEmotion();
      expect(emotion).toBe(70);
    });
  });

  describe('getEmotionPath', () => {
    it('returns path to happy face if emotion value is high', async () => {
      PointsService.getPointInfo.mockResolvedValue({});
      PointsService.getQualityPoints.mockReturnValue({
        wellness_points: 80
      });

      const path = getEmotionPath();
      expect(path).toBe(Resources.emotions.happy_face);
    });

    it('returns path to sad face if emotion value is low', () => {
      PointsService.getPointInfo.mockResolvedValue({});
      PointsService.getQualityPoints.mockReturnValue({
        wellness_points: 20
      });

      const path = getEmotionPath();
      expect(path).toBe(Resources.emotions.sad_face);
    });

    it('returns path to neutral face if emotion value is medium', () => {
      PointsService.getPointInfo.mockResolvedValue({});
      PointsService.getQualityPoints.mockReturnValue({
        wellness_points: 50
      });

      const path = getEmotionPath();
      expect(path).toBe(Resources.emotions.neutral_face);
    });
  });

  describe('getClothesPath', () => {
    it('returns the correct path for clothes', () => {
      const path = getClothesPath();
      expect(path).toEqual({
        top: Resources.tops.pierson_tshirt,
        bottom: Resources.bottoms.medium_jeans,
        accessories: Resources.accessories.black_sunglasses
      });
    });
  });

  describe('getClothes', () => {
    it('returns the correct clothing items', () => {
      const clothes = getClothes();
      expect(clothes).toEqual({
        top: "pierson_tshirt",
        bottom: "medium_jeans",
        accessories: "black_sunglasses"
      });
    });
  });
});
