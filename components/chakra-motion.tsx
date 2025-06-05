"use client"
import { Flex, Card } from "@chakra-ui/react";
import { motion } from "motion/react";

const MotionFlex = motion.create(Flex) 
const MotionCard = motion.create(Card.Root);
export {MotionFlex, MotionCard}