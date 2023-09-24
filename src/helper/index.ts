import { skill } from "types";

export const getSkillWords = (value: skill[]) => {
	return value.reduce((acc: string, val: skill, i: number) => {
		if (i === 0) {
			return acc + val.title;
		} else {
			return acc + ", " + val.title;
		}
	}, "");
};
