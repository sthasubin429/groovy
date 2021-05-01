import os
import json
import argparse

import numpy as np
import tensorflow as tf
from keras.models import Sequential, load_model
from keras.layers import LSTM, Dropout, TimeDistributed, Dense, Activation, Embedding

MODEL_DIR = './weights'
def save_weights(epoch, model):
    if not os.path.exists(MODEL_DIR):
        os.makedirs(MODEL_DIR)
    model.save_weights(os.path.join(MODEL_DIR, 'weights.{}.h5'.format(epoch)))

#load the weights
def load_weights(epoch, model):
    model.load_weights(os.path.join(MODEL_DIR, 'weights.{}.h5'.format(epoch)))

def build_sample_model(vocab_size):
    model = Sequential()
    model.add(Embedding(vocab_size, 512, batch_input_shape=(1, 1)))
    for i in range(4):
        model.add(LSTM(256, return_sequences=(i != 3), stateful=True))
        model.add(Dropout(0.2))

    model.add(Dense(vocab_size))
    model.add(Activation('softmax'))
    return model


#generating new music by sampling
def sample(epoch, header, num_chars):
    with open('char_to_idx.json') as f:
        char_to_idx = json.load(f)
    idx_to_char = { i: ch for (ch, i) in char_to_idx.items() }
    vocab_size = len(char_to_idx)

    model = build_sample_model(vocab_size)
    load_weights(epoch, model)
    model.save(os.path.join('model.{}.h5'.format(epoch)))

    sampled = [char_to_idx[c] for c in header]
    print(sampled)
    

    for i in range(num_chars):
        batch = np.zeros((1, 1))
        if sampled:
            batch[0, 0] = sampled[-1]
        else:
            batch[0, 0] = np.random.randint(vocab_size)
        result = model.predict_on_batch(batch).ravel()
        sample = np.random.choice(range(vocab_size), p=result)
        sampled.append(sample)

    return ''.join(idx_to_char[c] for c in sampled)

def generate_music():
    epoch=199 #'epoch checkpoint to sample from'
    seed='' #'initial character to start for the generated text'
    length=800   #'number of characters to sample'
    x = sample(epoch,seed,length)
    f= open("song.txt","w+")
    f.write(x)
    f.close()
    return {"status": True, "message":"File Generated"}

# epoch=199 #'epoch checkpoint to sample from'
# seed='' #'initial character to start for the generated text'
# length=512 #'number of characters to sample'
# x = sample(epoch,seed,length)
# print(x)