import numpy as np
import pandas as pd 
import matplotlib.pyplot as plt

df=pd.read_csv('caracteristiques-2018.csv',sep=',',encoding='latin-1')
df["count"]=[1]*len(df)

df=df.groupby(['int']).sum()
